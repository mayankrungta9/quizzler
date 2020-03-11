import { Component, OnInit, HostListener, ElementRef, ViewChild, InjectionToken } from '@angular/core';
import { HttpClientService, Quizes, UserCoins, UserCategoryData } from '../../service/httpclient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../../common/app.error';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShowCategory } from './showCategory';
import { GameOver } from './gameOver-component';
import { saveMe } from './saveMe.component';
import { success } from './success-component';
import { reportQues } from './reportQues.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: '../html/quizzler.component.html',
 
  host: { 'window:beforeunload': 'test' },
})
export class QuizComponent implements OnInit {
  subscriptions: Subscription[] = [];
  audio = new Audio();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('videoPlayer1') videoplayer1: ElementRef;
  @ViewChild('imagesTemp') imagesTemp: ElementRef;
  questionAudio = new Audio();
  isanimatedGifVaisible = false;
  tempAudio = new Audio();
  videoSource = '';
  videoSource1 = '';
  totalQuestion = 2;
  imgArray = new Image();
  audioFlag = true;
  correctlyAnsweredQues = 0;
  totalTimeLeft = 150;
  timeLeft: number = this.totalTimeLeft;
  interval;
  flag = false;
  isAudio = false;
  gameOver = false;
  subscribeTimer: any;
  quizes: Quizes[] = [];
  liveClassesArray: String[] = ['heart-img-filled', 'heart-img-filled', 'heart-img-filled'];
  index = 0;
  buttonAnimationCss1 = 'animated  bounceInLeft delay-5s';
  buttonAnimationCss2 = 'animated  bounceInRight delay-5s';
  emojiBoxCss = 'animated  heartBeat delay-5s'
  remainingLives = 0;
  correctAnswer = 0;
  coins = 0;
  testing = false;
  result: String;
  level: number;
  buttonCss: Number[] = [0, 0, 0, 0];
  userName: string;
  categoryId: number;
  userCategoryData: UserCategoryData;
  isOptionButtonVisible = true;
  emojiCategoryId = 6;
  emojiAnswerArray = [];
  emojiIndex = 0;
  emojiTextBox='';
  keyboardArray1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  keyboardArray2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  keyboardArray3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  keyboardAnimation= 'animated  bounceIn delay-2s'
values=['','','','',''];
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
  ) { console.log('quizzler module loaded.'); }
  ngOnInit() {
    this.userName = this.activatedrouter.snapshot.paramMap.get('userName');
    this.categoryId = +this.activatedrouter.snapshot.paramMap.get('categoryId');
    this.level = +this.activatedrouter.snapshot.paramMap.get('level');
    this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.level);
    this.loadQuiz();
    // this.startTimer();
  }
  openSuccessDialog() {
    this.dialog.open(success, {
      data: this.coins,
    }).afterClosed().subscribe(response => {
      if (response == 'continue') {
        setTimeout(() => {
          this.loadQuiz();
        }, 1000);
      } else {
        this.router.navigate(['/showCategory/' + this.userName]);
      }
    });
  }
  openGameOverDialog() {
    this.dialog.open(GameOver, {
      data: this.coins,
    }).afterClosed().subscribe(response => {
      if (response === 'continue') {
        setTimeout(() => {
          this.loadQuiz();
        }, 1000);
      } else {
        this.router.navigate(['/showCategory/' + this.userName]);
      }
    });
  }
  
  openSaveMeDialog() {
    this.dialog.open(saveMe).afterClosed().subscribe(response => {
      if (response == 'yes') {
        this.coins -= 100;
        setTimeout(() => {
          this.next();
        }, 1000);
      } else {
        this.httpClientService.saveUserCoins(this.userName, this.coins).subscribe();
        this.openGameOverDialog();
      }
    });
  }
  private loadQuiz() {
    this.buttonCss = [0, 0, 0, 0];
    this.audio.src = '../assets/audio/error.mp3';
    this.audio.load();
    this.subscriptions.push(this.httpClientService.
      loadQuizes(this.userCategoryData).subscribe(response =>
        this.handleSuccessfulResponse(response), (error: any) => {
          if (error instanceof AppError) {
            console.log('some thing app missing');
          } else {
            throw error;
          }
        }));
  }
  ngOnDestroy() {
    this.quizes = [];
    this.questionAudio.pause();
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  handleSuccessfulResponse(response) {
    this.quizes = response;
    this.setEmojiButtonOption();
    if (this.quizes[this.index].type === 'audio') { this.isAudio = true; }
    if (this.quizes[this.index].type === 'video') {
      this.videoSource = this.quizes[this.index].url;
      this.videoSource1 = this.quizes[this.index + 1].url;
      setTimeout(() => {
        this.videoplayer.nativeElement.load();
        this.playVideo();
        this.loadNextInBackground();
      }, 100);
    }
    else {
      this.loadNextInBackground();
    }
  }
  private setEmojiButtonOption() {
    if (this.quizes[this.index].categoryId === this.emojiCategoryId) {
      this.isOptionButtonVisible = false;
      var length = this.quizes[this.index].answer.length;
      this.emojiAnswerArray = Array(length);
    }
    else {
      this.isOptionButtonVisible = true;
    }
  }

  handlesubmitAnswerResponse(result) {
    this.result = result;
  }
  onSelectAnswer(selectedAnswer): void {
    this.questionAudio.pause();
    this.pauseTimer();
    let correctAnswer: string = this.quizes[this.index].answer;

    if (selectedAnswer == correctAnswer) {
      this.whenAnswerIsCorrect(selectedAnswer);
    } else {

      this.wrongAnswer(selectedAnswer);
    }
  }
  private whenAnswerIsCorrect(selectedAnswer: any) {


    this.correctlyAnsweredQues++;
    this.buttonCss[selectedAnswer - 1] = 1;
    this.coins += 100;
    if (this.correctlyAnsweredQues < this.totalQuestion) {
      this.isanimatedGifVaisible = true;
      setTimeout(() => {
        this.isanimatedGifVaisible = false;
        this.next();
      }, 1000);
    }
    else {
      this.openSuccessDialog();
      this.level += 1;
      this.userCategoryData.level = this.level;
      this.saveUserProgress();

    }
  }
 
  onPressBackKey() {
    if (this.emojiIndex > 0) {
      this.emojiAnswerArray[--this.emojiIndex] = '';
    }
  }
  private applyAnimationOnWrongEmojiAnswer() {

    setTimeout(() => {
      this.emojiBoxCss = 'animated  bounceIn delay-2s';

    });
    this.emojiBoxCss = 'animated   delay-2s';
  }

  private applyAnimationOnKeyBoardLoad() {
    this.keyboardAnimation = 'animated bounceOutRight delay-2s';
    setTimeout(() => {
      this.keyboardAnimation= 'animated   bounceInLeft delay-2s';

    });
    
  }
  onPressKey1(event,index) {
    var keyPressed=event.target.value;    
    this.values[index]=keyPressed;
    var userAnswer = this.values.join("");
    console.log(userAnswer);
  }
  onPressKey(event) {
    var keyPressed=event.target.value;
    console.log(this.emojiIndex);
    this.values[this.emojiIndex]=keyPressed;
    console.log(keyPressed);
    this.addAnimationOnKeyboardPress(event);
    this.emojiAnswerArray[this.emojiIndex++] = keyPressed;
  
    if (this.emojiIndex === this.emojiAnswerArray.length) {
      var correctAnswer = this.quizes[this.index].answer.toUpperCase();
      var userAnswer = this.emojiAnswerArray.join("");

      if (userAnswer === correctAnswer) {
        this.pauseTimer();
        this.emojiIndex = 0;
        this.whenAnswerIsCorrect(null);
      }
      else {
        this.applyAnimationOnWrongEmojiAnswer();
        this.pauseTimer();
        this.emojiIndex = 0;
        this.wrongAnswer(null);

      }
    }
  }
  
  private addAnimationOnKeyboardPress(event: any) {
    const classList = event.target.classList;
    classList.remove('bounceIn');
    setTimeout(() => {
      classList.add("animated");
      classList.add("bounceIn");
      classList.add("delay-2s");
    });
  }

  saveUserProgress() {
    this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
    this.httpClientService.saveUserCoins(this.userName, this.coins).subscribe();
  }
  wrongAnswer(selectedAnswer) {
    let correctAnswer: string = this.quizes[this.index].answer;
    this.liveClassesArray[this.remainingLives] = 'heart-img-blank';
    this.audio.play();
    this.coins -= 50;
    if (this.remainingLives < 0) {
      this.openSaveMeDialog();
    } else {
      if (selectedAnswer != 0) {
        this.buttonCss[selectedAnswer - 1] = 2;
      }

      this.remainingLives--;
      // this.buttonCss[correctAnswer - 1] = 1;
      setTimeout(() => {
        this.next();
      }, 1000);
    }
  }
  next() {
    this.isAudio = false;
    this.index++;
    this.setEmojiButtonOption();
    setTimeout(() => {
      const type = this.quizes[this.index].type;
      console.log(type);
      if (this.quizes[this.index].type === 'image') {
        this.imagesTemp.nativeElement.src = this.imgArray.src;
      }
      if (type == 'audio') {
        this.isAudio = true;
        this.playSound();
      }
      if (type === 'video') {
        this.playVideo();
      }
      this.loadNextInBackground();
    }, 0);
    this.applyAnimationOnButton();
    this.applyAnimationOnKeyBoardLoad();
    this.buttonCss = [0, 0, 0, 0];

    this.timeLeft = this.totalTimeLeft;
    this.startTimer();
  }
  private loadNextInBackground() {
    const type = this.quizes[this.index + 1].type;
    if (type === 'audio') {
      this.tempAudio = new Audio();
      this.tempAudio.src = this.quizes[this.index + 1].url;
      this.tempAudio.loop = true;
      this.tempAudio.load();
    } else if (type === 'image') {
      this.imgArray.src = this.quizes[this.index + 1].url;
    }
    else if (type === 'video') {
      if (this.flag) {
        this.videoSource1 = this.quizes[this.index + 1].url;
        this.videoplayer1.nativeElement.load();
      } else {
        this.videoSource = this.quizes[this.index + 1].url;
        this.videoplayer.nativeElement.load();
      }
    }
  }
  private applyAnimationOnButton() {
    this.buttonAnimationCss1 = 'animated  bounceOutRight delay-2s';
    this.buttonAnimationCss2 = 'animated  bounceOutRight delay-2s';
    setTimeout(() => {
      this.buttonAnimationCss1 = 'animated  bounceInLeft delay-2s';
      this.buttonAnimationCss2 = 'animated  bounceInRight delay-2s';
    });
  }
  playSound(): void {
    this.questionAudio = this.tempAudio;
    this.questionAudio.play();
  }
  playVideo(): void {
    this.flag = !this.flag;
    if (this.flag) {
      this.videoplayer.nativeElement.play();
    } else {
      this.videoplayer1.nativeElement.play();
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.wrongAnswer(0);
        this.pauseTimer();
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  openQuestionReportedDialogue() {
    this.dialog.open(reportQues).afterClosed().subscribe(response => {
      this.httpClientService.reportQuestion(this.quizes[this.index].id, response).subscribe(
        result => {
          alert('question reported successfully');
        }, (error: HttpErrorResponse) => {
          alert(error.error.text);
        }
      );
    });
  }
}
