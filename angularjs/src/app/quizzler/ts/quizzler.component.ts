import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClientService, Quizes, UserCoins, UserCategoryData } from '../../service/httpclient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../../common/app.error';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GameOver } from './gameOver-component';
import { saveMe } from './saveMe.component';
import { success } from './success-component';
import { reportQues } from './reportQues.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CatchHeroComponent } from '../../catch-hero/catch-hero.component';
import { NgImageSliderComponent } from 'ng-image-slider';
import {AppSettings} from './AppSettings';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-employee',
  templateUrl: '../html/quizzler.component.html',
  styleUrls: ['./quizzler.component.css'],
  host: { 'window:beforeunload': 'test' },
})
export class QuizComponent implements OnInit {
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
  ) {  }
  subscriptions: Subscription[] = [];
  audio = new Audio();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('videoPlayer1') videoplayer1: ElementRef;
  @ViewChild('imagesTemp') imagesTemp: ElementRef;
 catchHero = new CatchHeroComponent();
  questionAudio = new Audio();
  isanimatedGifVaisible = false;
  tempAudio = new Audio();
  videoSource = '';
  videoSource1 = '';
  imgArray = new Image();
  audioFlag = true;
  correctlyAnsweredQues = 1;

  timeLeft: number = AppSettings.totalTimeLeft;
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
  emojiDivCss = 'animated  heartBeat delay-5s';
  emojiLengthArray=[];
totalQuestion:number=AppSettings.totalQuestion
  correctAnswer = 0;
  coins = 0;
  testing = false;
  result: String;
  level: number;
  buttonCss: Number[] = [0, 0, 0, 0];
  userName: string;
  categoryId: number;
  userCategoryData: UserCategoryData;
  isOptionButtonVisible = false;
  emojiAnswerArray = [];
  emojiIndex = 0;
  emojiTextBox = '';
  values = ['', '', '', '', ''];
  imageObject: Array < object >;
  @ViewChild('nav') slider: NgImageSliderComponent;
  @ViewChild('emojiTextBox0') searchElement: ElementRef;
   emojilengthcounter=0;
	   marginRrightPercent=[];
isMovingPictureDivVisible = false;
   isemojiBoxVisible = false;
   @ViewChild("myInput0") private _inputElement: ElementRef;
  ngOnInit() {

    this.userName = this.activatedrouter.snapshot.paramMap.get('userName');
    this.categoryId = +this.activatedrouter.snapshot.paramMap.get('categoryId');
    this.level = +this.activatedrouter.snapshot.paramMap.get('level');
    this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.level);
    if (this.categoryId == 1 || this.categoryId === 2   ) {
      this.isOptionButtonVisible = true;
    } else if (this.categoryId == AppSettings.catchHeroCategoryId    ) {
      this.isMovingPictureDivVisible = true;
          } else if (this.categoryId == AppSettings.emojiCategoryId   ) {
           
            this.isemojiBoxVisible = true;
    }
    this.loadQuiz();
    // this.startTimer();
  }
  checkAnswer(selectedAnswer) {

    if (selectedAnswer + 1 == this.quizes[this.index].answer) {
this.whenAnswerIsCorrect(null);
    } else {
this.wrongAnswer(null);
    }
}
openLoginDialog() {

  this.dialog.open(LoginComponent).afterClosed().subscribe(response => {
    if (response != null) {
      this.userName = response;    
    this.userCategoryData.userId=response;
      this.openSuccessDialog();
    } else {
      console.log("sorry wrong credential");
    }
  });
}
  openSuccessDialog() {
   
    this.dialog.open(success, {
      data: this.coins,
    }).afterClosed().subscribe(response => {
      this.saveUserProgress();
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
    if (this.quizes[this.index].categoryId === AppSettings.catchHeroCategoryId) { this.prepareCelebrityOption(this.quizes[this.index]); }
    if (this.quizes[this.index].categoryId === AppSettings.emojiCategoryId) { this.setEmojiButtonOption(); }
    if (this.quizes[this.index].type === 'audio') { this.isAudio = true; }
    if (this.quizes[this.index].type === 'video') {
      this.videoSource = this.quizes[this.index].url;
      this.videoSource1 = this.quizes[this.index + 1].url;
      setTimeout(() => {
        this.videoplayer.nativeElement.load();
        this.playVideo();
        this.loadNextInBackground();
      }, 100);
    } else {
      this.loadNextInBackground();
    }
  }
  prepareCelebrityOption(quiz: Quizes) {
    this.imageObject = this.catchHero.prepareOption(quiz);
     }
	 
  
  private setEmojiButtonOption() {
	  	  
	var form =document.getElementById("reset");
	this.emojiLengthArray = Array(this.quizes[this.index].answer.split("").length).fill('0%');
	if(null!=form){
		(form as HTMLInputElement).click();
		
		
	}
	
	 var tempArray=this.quizes[this.index].answer;
	  this.quizes[this.index].answer=this.quizes[this.index].answer.replace(/ /g,"");
      this.emojiAnswerArray = this.quizes[this.index].answer.split("");
	  
	   var counter=1;
	   
	   
	for(var number=0;number<tempArray.length;number++)	   
	{
		if(tempArray[number]==' '){
			console.log(number-counter);
			this.emojiLengthArray[number-counter]='14%';
			++counter;
			
		}
	}
	 
	
	   
	   const length = this.emojiAnswerArray.length;
      this.values = Array(length).fill('');
      const element = document.getElementById('0');
      if (null != element) {
		  console.log(element)
        element.focus();
      }
	 
     }
	  
	 	



  handlesubmitAnswerResponse(result) {
    this.result = result;
  }
  onSelectAnswer(selectedAnswer): void {
    this.questionAudio.pause();
    this.pauseTimer();
    const correctAnswer: string = this.quizes[this.index].answer;

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
    if (this.correctlyAnsweredQues < AppSettings.totalQuestion) {
      //this.isanimatedGifVaisible = true;
      setTimeout(() => {
        this.isanimatedGifVaisible = false;
        this.next();
      }, 1000);
    } else {
      
      if(this.userName=='Guest'){
        this.openLoginDialog();
      }
      else {
        this.openSuccessDialog();
        
      }

      
      

    }
  }
  


  private applyAnimationOnWrongEmojiAnswer() {

    setTimeout(() => {
      this.emojiDivCss = 'animated  bounceIn delay-2s';

    });
    this.emojiDivCss = 'animated   delay-2s';
  }


  onPressKey1(event, index) {

    if (event.key === 'Backspace') {
      let element = document.getElementById('' + (index - 1));
      if (null != element) {
          element.focus();
          (element as HTMLInputElement).value = '';
        }
  } else {
	  const keyPressed = event.target.value;
    const regex = /^[A-Za-z0-9]+$/;
	  var element = document.getElementById('' + (index ));
	  (element as HTMLInputElement).value = keyPressed.toUpperCase();
	    element = document.getElementById('' + (index + 1));
	  
    


     element = document.getElementById(index + 1);
    if (null != element) {
        element.focus();  

    //this.emojiDivCss = 'animated   delay-2s';
      }
    this.values[index] = keyPressed;
    const userAnswer = this.values.join('').toUpperCase();

    if (userAnswer.length === this.emojiAnswerArray.length) {
        const correctAnswer = this.quizes[this.index].answer.toUpperCase();

        if (userAnswer === correctAnswer) {
          this.pauseTimer();
          this.emojiIndex = 0;
          this.whenAnswerIsCorrect(null);
        } else {
          this.applyAnimationOnWrongEmojiAnswer();
          this.pauseTimer();
          this.emojiIndex = 0;
          this.wrongAnswer(null);

        }
      }
      }
}
   saveUserProgress() {
    console.log(this.userName);
    this.level += 1;
    this.userCategoryData.level = this.level;

    this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
    this.httpClientService.saveUserCoins(this.userName, this.coins).subscribe();
  }
  wrongAnswer(selectedAnswer) {
    const correctAnswer: string = this.quizes[this.index].answer;
    this.liveClassesArray[AppSettings.remainingLives] = 'heart-img-blank';
    this.audio.play();
    this.coins -= 50;
    if (AppSettings.remainingLives < 0) {
      this.openSaveMeDialog();
    } else {
      if (selectedAnswer != 0) {
        this.buttonCss[selectedAnswer - 1] = 2;
      }

      AppSettings.remainingLives--;
      // this.buttonCss[correctAnswer - 1] = 1;
      setTimeout(() => {
        this.next();
      }, 1000);
    }
  }
  next() {
    this.isAudio = false;
    this.index++;
    if (this.categoryId === AppSettings.emojiCategoryId) {  this.setEmojiButtonOption(); }
    if (this.categoryId === AppSettings.catchHeroCategoryId) {
       this.prepareCelebrityOption(this.quizes[this.index]);

       setInterval(() => {
     this.slider.next();
    }
       , 500);
      }
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
    this.buttonCss = [0, 0, 0, 0];

    this.timeLeft = AppSettings.totalTimeLeft;
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
    } else if (type === 'video') {
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
