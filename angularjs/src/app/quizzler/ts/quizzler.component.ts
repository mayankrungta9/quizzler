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


@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: '../html/quizzler.component.html',
  styleUrls: ['./quizzler.component.css'],
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
  videoSource = "";
  videoSource1 = "";
  totalQuestion: number = 1;
  imgArray = new Image();
  correctlyAnsweredQues: number = 0;
  totalTimeLeft = 15;
  timeLeft: number = this.totalTimeLeft;
  interval;
  flag = true;
  isAudio = false;
  gameOver: boolean = false;
  subscribeTimer: any;
  quizes: Quizes[] = [];
  liveClassesArray: String[] = ["heart-img-filled", "heart-img-filled", "heart-img-filled"];
  index = 0;
  buttonAnimationCss1 = "animated  bounceInLeft delay-5s";
  buttonAnimationCss2 = "animated  bounceInRight delay-5s";
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
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
  ) { console.log('quizzler module loaded.');}

  ngOnInit() {
    this.userName = this.activatedrouter.snapshot.paramMap.get("userName");
    this.categoryId = +this.activatedrouter.snapshot.paramMap.get("categoryId");
    this.level = +this.activatedrouter.snapshot.paramMap.get("level");
    this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.level);
    this.loadQuiz();
    //this.startTimer(); 
  }

  openSuccessDialog() {

    this.dialog.open(success,{
     data: this.coins,
    }).afterClosed().subscribe(response => {
      if (response == 'continue') {
        
        setTimeout(() => {
          this.loadQuiz();
        }, 1000);
      }
      else {
        
        this.router.navigate(['/showCategory/'+ this.userName]);
      }
    });
  }

  openGameOverDialog() {

    this.dialog.open(GameOver,{
     data: this.coins,
    }).afterClosed().subscribe(response => {
      if (response == 'continue') {
        
        setTimeout(() => {
          this.loadQuiz();
        }, 1000);
      }
      else {
        
        this.router.navigate(['/showCategory/'+ this.userName]);
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
      }
      else {
        this.httpClientService.saveUserCoins(this.userName, this.coins).subscribe();
        this.openGameOverDialog();
      }
    });
  }

  private loadQuiz() {

    this.buttonCss = [0, 0, 0, 0]
    this.audio.src = "../assets/audio/error.mp3";
    this.audio.load();

    this.subscriptions.push(this.httpClientService.loadQuizes(this.userCategoryData).subscribe(response => this.handleSuccessfulResponse(response), (error: any) => {
      if (error instanceof AppError) {
        console.log("some thing app missing");
      }
      else
        throw error;
    }));
  }

  ngOnDestroy() {
    this.quizes = [];
    this.questionAudio.pause();
    this.subscriptions.forEach(s => s.unsubscribe());

  }
  handleSuccessfulResponse(response) {
    this.quizes = response;
    if (this.quizes[this.index].type == 'audio') {
      this.isAudio = true;
      this.tempAudio.src = this.quizes[this.index].url;
      this.tempAudio.loop = true;
      this.tempAudio.load();
      setTimeout(() => {
        this.playSound();
      }, 100);

    }
    if (this.quizes[this.index].type == 'image') {
      this.imgArray.src = this.quizes[1].url;
    }
    if (this.quizes[this.index].type == 'video') {
      this.videoSource = this.quizes[this.index].url;

      this.videoSource1 = this.quizes[this.index + 1].url;
      setTimeout(() => {
        this.videoplayer.nativeElement.play();
      }, 0);
    }

  }

  handlesubmitAnswerResponse(result) {
    this.result = result;
  }
  onSelectAnswer(selectedAnswer): void {
    this.questionAudio.pause();

    this.pauseTimer();
    var correctAnswer: number = this.quizes[this.index].answer;
    if (selectedAnswer == correctAnswer) {
      this.correctlyAnsweredQues++;
      this.buttonCss[selectedAnswer - 1] = 1;

      this.coins += 100;

      if (this.correctlyAnsweredQues < this.totalQuestion) {
        this.isanimatedGifVaisible = true;
        setTimeout(() => {
          this.isanimatedGifVaisible = false;
          this.next();
        }, 1000)
      } else {
        this.openSuccessDialog();
        this.level += 1;
        this.userCategoryData.level = this.level;
        this.saveUserProgress();
                
      
        //  this.activatedrouter.navigate(['success']);
      }
    }
    else {

      this.wrongAnswer(selectedAnswer);
    }

  };

  saveUserProgress() {

    this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
    this.httpClientService.saveUserCoins(this.userName, this.coins).subscribe();
  }
  wrongAnswer(selectedAnswer) {
    var correctAnswer: number = this.quizes[this.index].answer;
    this.liveClassesArray[this.remainingLives] = "heart-img-blank";

    this.audio.play();
    this.coins -= 50;

    if (this.remainingLives < 0) {
      this.openSaveMeDialog();

    }
    else {
      if (selectedAnswer != 0) {
        this.buttonCss[selectedAnswer - 1] = 2;
      }
      this.remainingLives--;
      // this.buttonCss[correctAnswer - 1] = 1;
      setTimeout(() => {
        this.next();
      }, 1000)
    }
  }

  next() {
    if (this.quizes[this.index].type == 'image') {
      this.imagesTemp.nativeElement.src = this.imgArray.src;
    }


    this.buttonAnimationCss1 = "animated  bounceOutRight delay-2s";
    this.buttonAnimationCss2 = "animated  bounceOutRight delay-2s";


    setTimeout(() => {
      this.buttonAnimationCss1 = "animated  bounceInLeft delay-2s";
      this.buttonAnimationCss2 = "animated  bounceInRight delay-2s";
    })

    this.buttonCss = [0, 0, 0, 0]

    this.index++;
    console.log(this.quizes[this.index].type);
    this.timeLeft = this.totalTimeLeft;
    this.startTimer();
    if (this.quizes[this.index].type == 'audio') {
      this.playSound();
    }

    if (this.quizes[this.index].type == 'video') {

      this.playVideo();

    }
    this.imgArray.src = this.quizes[this.index + 1].url;
  }

  playSound(): void {
    this.questionAudio = this.tempAudio;
    this.questionAudio.play();
    this.tempAudio = new Audio();
    this.tempAudio.src = this.quizes[this.index + 1].url;
    this.tempAudio.loop = true;
    this.tempAudio.load();

  };
  playVideo(): void {

    this.flag = !this.flag;

    if (this.flag) {
      this.videoplayer.nativeElement.play();
      this.videoSource1 = this.quizes[this.index + 1].url;
      this.videoplayer1.nativeElement.load();
    } else {
      this.videoplayer1.nativeElement.play();
      this.videoSource = this.quizes[this.index + 1].url;
      this.videoplayer.nativeElement.load();
    }

  };



  startTimer() {

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {

        this.timeLeft--;
      } else {
        this.wrongAnswer(0);

        this.pauseTimer();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}

