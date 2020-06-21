import { Component, OnInit,AfterViewInit, HostListener, ElementRef, ViewChild,Renderer2 } from '@angular/core';
import { HttpClientService, Quizes, UserData, UserCategoryData,LiveQuizPoints } from '../../service/httpclient.service';
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
import { CategoryCompleted } from './categoryCompleted';
import {  OnDestroy } from '@angular/core';
@Component({
  selector: 'app-employee',
  templateUrl: '../html/quizzler.component.html',
  styleUrls: ['./quizzler.component.css'],
  host: { 'window:beforeunload': 'test' },
})
export class QuizComponent implements OnInit,OnDestroy  {
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
	private userData:UserData,
  private renderer: Renderer2,
 
  ) {  }
  subscriptions: Subscription[] = [];
  ifAudioAutoPlay=true;
  audio = new Audio();
  correctAnswerAudio=new Audio();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('videoPlayer1') videoplayer1: ElementRef;
  @ViewChild('imagesTemp') imagesTemp: ElementRef;
  @ViewChild('option1') option1: ElementRef;
  @ViewChild('option2') option2: ElementRef;
  @ViewChild('option3') option3: ElementRef;
  @ViewChild('option4') option4: ElementRef;
  progress=100;
 catchHero = new CatchHeroComponent();
  questionAudio = new Audio();
  isanimatedGifVaisible = false;
  isHintVisible=false;
  tempAudio = new Audio();
  videoSource = '';
  videoSource1 = '';
  imgArray = new Image();
  option1Temp=new Image();
  option2Temp=new Image();
  option3Temp=new Image();
  option4Temp=new Image();
  audioFlag = true;
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
  levelCleared=false;
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
   isLiveQuiz=false;
   quizId=0;
   imageOption=false;
   remainingLives=AppSettings.remainingLives;
   isDisabled=true; 
   description="Actor - Varun Dhawan, Actress - Anushka Sharma";
   actor="Actor - Varun Dhawan";
   actress="Actress - Anushka Sharma";
    pausetoggle=true;
   @ViewChild("myInput0") private _inputElement: ElementRef;
  totalLevel=0;
   
  @HostListener('window:popstate', ['$event'])
   onPopState(event) {
   this.pauseTimer();
   }
 
   @HostListener('window:visibilitychange', ['$event'])
   onvisibilitychange(event) {
     if(this.pausetoggle){
      this.pause();
      console.log("test");
      this.pausetoggle=false;
     }
  else{
    this.resume();
    this.pausetoggle=true;
  }
   }

  pause() {
    this.pauseTimeAndAudio();
    console.log('pause');
  }
  resume() {
    this.resumeTimeAndAudio();
    console.log('resume');
  }

 
  pasueEveryThing(self:any){
    console.log('in blur')
    self.pauseTimer();
  }
  ngOnInit() {

    

    this.userName = this.userData.userId;
	
    this.httpClientService.level = +this.activatedrouter.snapshot.paramMap.get('level');
    this.httpClientService.onHomePage=false;
   
	if(this.httpClientService.level == -1){
		this.isLiveQuiz=true;
		 this.timeLeft = AppSettings.totalTimeLeftForLiveQuiz;
		var temp = this.activatedrouter.snapshot.paramMap.get('categoryId').split(",");
		this.quizId=+temp[0];
		this.categoryId=+temp[1];
	}
	else {
  
    this.categoryId = +this.activatedrouter.snapshot.paramMap.get('categoryId');
    this.totalLevel= +this.activatedrouter.snapshot.paramMap.get('totalLevel');
	}
    this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.httpClientService.level);
    if (this.categoryId == 1 || this.categoryId === 5   ) {
      this.isOptionButtonVisible = true;
  } else if (this.categoryId == AppSettings.catchHeroCategoryId  || this.categoryId == AppSettings.catchActressCategoryId   ) {
      this.isMovingPictureDivVisible = true;
     
          } else if (this.categoryId == AppSettings.emojiCategoryId   ) {
            this.isHintVisible=false;
            this.isemojiBoxVisible = true;
    }
   
    this.loadQuiz();
    if(   !this.isemojiBoxVisible)
     this.startTimer();
	
  }

  checkAnswer(selectedAnswer) {
	 this.isDisabled=true;
	 this.pauseTimer();
	 
	 if(this.quizes[this.index].type=='audio'){
	this.pauseAudio();}
var  myElement =document.getElementById('imageDiv'+selectedAnswer);

 myElement.classList.add('heart');


    if (selectedAnswer  == this.quizes[this.index].answer) {
		myElement.classList.add('img-correct');
this.whenAnswerIsCorrect(null);
    } else {
		myElement.classList.add('img-wrong');
this.wrongAnswer(null);
    }
}
setUserData(){
	   this.httpClientService.loadUserData(this.userData.userId).subscribe(response=>{
	this.userData=response
	
	}
	);
  }

openLoginDialog() {

  this.dialog.open(LoginComponent,{
  height: '75%',
  width: '95%',
  disableClose: true,
	  }).afterClosed().subscribe(response => {
    if (response != null) {
      this.userData.cloneUserData(response);
	 
	  
    this.userCategoryData.userId=response.userId;
	
	this.openSuccessDialog();
	
    } else {
      console.log("sorry wrong credential");
    }
  });
}

openLeaderBoardDialog(){
	this.levelCleared=true;
  this.saveLiveUserProgress();
  
}
openOfflineQuizDialog(){
	this.levelCleared=true;
    this.dialog.open(success, {
      data: this.coins,
	  height: '50%',
  width: '95%',
  disableClose: true,
    }).afterClosed().subscribe(response => {
		this.levelCleared=false;
		this.quizes=[];
      this.saveUserProgress();
      if (response == 'continue') {
        setTimeout(() => {
          this.loadQuiz();
		 //this.router.navigate(['quiz', this.userData.userId, this.categoryId,  this.httpClientService.level]);
        }, 1000);
      } else {
        this.router.navigate(['home' ]);
      }
    });
}
  openSuccessDialog() {
   if(!this.isLiveQuiz)
   {
    if(this.totalLevel<=this.httpClientService.level){
this.openCategoryCompleteddialog();
    }
    else{
      this.openOfflineQuizDialog();
    }
    

   }
      
	  else {
		   this.openLeaderBoardDialog();
	  }
  }
  openCategoryCompleteddialog() {
    this.levelCleared=true;
    this.dialog.open(CategoryCompleted, {
      data: this.coins,
	  height: '50%',
  width: '95%',
  disableClose: true, 
    });
  }
  openGameOverDialog() {
    this.dialog.open(GameOver, {
      data: this.coins,
	  height: '50%',
  width: '95%',
    }).afterClosed().subscribe(response => {
		//this.saveUserProgress();
      if (response === 're-play') {
        setTimeout(() => {
          this.loadQuiz();
        }, 1000);
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  openSaveMeDialog() {
   this.pauseTimer();
    this.dialog.open(saveMe,{ height: '50%',
    width: '95%',}).afterClosed().subscribe(response => {
      if (response == 'yes') {
        this.coins -= 20;
        setTimeout(() => {
          this.next();
        }, 1000);
      } else {
        this.userData.coins=this.coins;
        this.httpClientService.updateUser(this.userData, 'updateUser').subscribe();
        this.openGameOverDialog();
      }
    });
    
  }
  private loadQuiz() {
    this.liveClassesArray=['heart-img-filled', 'heart-img-filled', 'heart-img-filled'];
    this.index=0;
    this.remainingLives=AppSettings.remainingLives;
    this.buttonCss = [0, 0, 0, 0];
    this.audio.src = '../assets/audio/error.mp3';
    this.audio.load();
	 this.correctAnswerAudio.src = '../assets/audio/correct-answer.mp3';
    this.correctAnswerAudio.load();
	if(this.isLiveQuiz){
		this.subscriptions.push(this.httpClientService.
      loadLiveQuizes(this.categoryId).subscribe(response =>
        this.handleSuccessfulResponse(response), (error: any) => {
          if (error instanceof AppError) {
            console.log('some thing app missing');
          } else {
            throw error;
          }
        }));
	}
	else{
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
  }
  ngOnDestroy() {
    this.quizes = [];
    this.questionAudio.pause();
    this.subscriptions.forEach(s => s.unsubscribe());
    this.pauseTimer();
    console.log('destro quiz');
  }
  
  
  
  
  handleSuccessfulResponse(response) {
    this.quizes = response;
	console.log(this.quizes[this.index].type);
    if (this.quizes[this.index].categoryId === AppSettings.catchHeroCategoryId) {  }
    if (this.quizes[this.index].categoryId === AppSettings.emojiCategoryId) { this.setEmojiButtonOption(); }
    if (this.quizes[this.index].type === 'audio') { 

  this.isAudio = true;
  console.log(this.isAudio); 
	this.questionAudio.src = this.quizes[this.index ].url;
      this.questionAudio.loop = true;
      this.questionAudio.load();
	   
		
		var promise=this.questionAudio.play();
    this.checkIfMediaPlay(promise);
    this.loadNextInBackground();
		}
     
   else if (this.quizes[this.index].type === 'video') {
      this.videoSource = this.quizes[this.index].url;
      this.videoSource1 = this.quizes[this.index + 1].url;
      setTimeout(() => {
        this.videoplayer.nativeElement.load();
		
        var promise=this.playVideo();
		this.checkIfMediaPlay(promise);
        this.loadNextInBackground();
      }, 100);
    } 
    
    else if (this.quizes[this.index].type === 'image'){
      setTimeout(() => {
        this.imagesTemp.nativeElement.src =  this.quizes[this.index].url;
        this.loadNextInBackground();
      }, 500);
     
    }
    if (this.isMovingPictureDivVisible){
      setTimeout(() => {
        this.option1.nativeElement.src =  this.quizes[this.index].option1;
        this.option2.nativeElement.src =  this.quizes[this.index].option2;
        this.option3.nativeElement.src =  this.quizes[this.index].option3;
        this.option4.nativeElement.src =  this.quizes[this.index].option4;
        this.loadNextInBackground();
      }, 500);
      
    }
	console.log("end handleSuccessfulResponse");
  this.isDisabled=false;
  }
  checkIfMediaPlay(promise){
	   setTimeout(()=>{
		if (promise !== undefined) {
  promise.then(_ => {
     console.log('autoplay');
	 this.ifAudioAutoPlay=true;
  }).catch(error => {
   
   this.ifAudioAutoPlay=false;
  });
}
   
   
  },100);
   }
  playAudio(){
	  console.log('button clicked');
	  this.questionAudio.play();
	  this.ifAudioAutoPlay=true;
  }
  pauseAudio(){
	  console.log('button clicked');
	  this.questionAudio.pause();
	  this.ifAudioAutoPlay=false;
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
	  this.isDisabled=true;
	  var type=this.quizes[this.index].type;
   
	this.pauseTimeAndAudio();
    const correctAnswer: string = this.quizes[this.index].answer;

    if (selectedAnswer == correctAnswer) {
		
      this.whenAnswerIsCorrect(selectedAnswer);
    } else {

      this.wrongAnswer(selectedAnswer);
    }
  }
  private pauseTimeAndAudio() {
    var type=this.quizes[this.index].type;
    if (type == 'video') {
      this.pauseVideoMedia();
    }
    if (type == 'audio') {
      this.pauseAudio();
    }
    this.pauseTimer();
  }

  private resumeTimeAndAudio() {
    var type=this.quizes[this.index].type;
    if (type == 'video') {
      this.playVideoMedia();
    }
    if (type == 'audio') {
      this.playAudio();
    }
    this.startTimer();
  }
  private whenAnswerIsCorrect(selectedAnswer: any) {

this.correctAnswerAudio.play();
  
    this.buttonCss[selectedAnswer - 1] = 1;
    this.coins += 10;
    setTimeout(() => {
      this.next();
        
      }, 1000);
  }
  
wrongAnswer(selectedAnswer) {
    
    this.liveClassesArray[this.remainingLives] = 'heart-img-blank';
    this.audio.play();
    this.coins -= 5;
    if (this.remainingLives < 0) {
      this.openSaveMeDialog();
    } else {
      if (selectedAnswer != 0) {
        this.buttonCss[selectedAnswer - 1] = 2;
      }
	if(!this.isLiveQuiz){
      this.remainingLives--;
							}
      // this.buttonCss[correctAnswer - 1] = 1;
      setTimeout(() => {
        this.next();
      }, 1000);
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
    this.httpClientService.level += 1;
    this.userCategoryData.level = this.httpClientService.level;
this.userData.coins+=this.coins;
this.coins=0;
    this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
    
       
       this.httpClientService.updateUser(this.userData, 'updateUser').subscribe(	response=>this.userData=response
	);
  }
  
  saveLiveUserProgress() {
    console.log(this.userName);
   var liveQuizPoints=new LiveQuizPoints (this.userData.userId,this.quizId,this.coins);


   
    this.httpClientService.saveLiveQuizPoints(liveQuizPoints).subscribe(	response=>{
      this.router.navigate(['showLiveQuizes/showRanking',this.quizId,this.categoryId ]);
    }
	);
  }
  next() { 
	   this.index++;
	   this.isDisabled=false;
	   this.isAudio = false;
	  if (this.index>= this.totalQuestion || (this.isLiveQuiz && this.timeLeft<=0)) {
		  var type = this.quizes[this.index-1].type;
      
        if(type=='video'){
		this.pauseVideoMedia();}
		  if(type=='audio'){
	this.pauseAudio();}
		
      if(this.userData.userId==null || this.userData.userId==''){
        this.openLoginDialog();
      }
      else {
        this.openSuccessDialog();
        
      } 
	  }
	  else {
      var type = this.quizes[this.index].type;
   
    if (this.categoryId === AppSettings.emojiCategoryId) {  this.setEmojiButtonOption(); }
    if (this.categoryId === AppSettings.catchHeroCategoryId) {
      
      }
    setTimeout(() => {
     
    if(this.isMovingPictureDivVisible){
      this.option1.nativeElement.src=this.option1Temp.src;
      this.option2.nativeElement.src=this.option2Temp.src;
      this.option3.nativeElement.src=this.option3Temp.src;
      this.option4.nativeElement.src=this.option4Temp.src;
    }

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

if(!this.isLiveQuiz){
    this.timeLeft = AppSettings.totalTimeLeft;
    this.progress=100;
}
if(   !this.isemojiBoxVisible)
    this.startTimer();
	  }
  }
  private loadNextInBackground() {
    if (this.isMovingPictureDivVisible) {
      console.log(this.option1);
      this.option1Temp.src = this.quizes[this.index + 1].option1;
      this.option2Temp.src = this.quizes[this.index + 1].option2;
      this.option3Temp.src = this.quizes[this.index + 1].option3;
      this.option4Temp.src = this.quizes[this.index + 1].option4;
    }
	  if (this.index+1< this.totalQuestion){
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
  }}
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
   var promise= this.questionAudio.play();
	 this.checkIfMediaPlay(promise);
  }
  playVideo(): void {
    this.flag = !this.flag;
	var promise;
    if (this.flag) {
     promise= this.videoplayer.nativeElement.play();
    } else {
      promise=this.videoplayer1.nativeElement.play();
    }
	this.checkIfMediaPlay(promise);
  }
  playVideoMedia(){
	  if (this.flag) {
      this.videoplayer.nativeElement.play();
    } else {
      this.videoplayer1.nativeElement.play();
    }
	this.ifAudioAutoPlay=true;
  }
  pauseVideoMedia(){
	  if (this.flag) {
      this.videoplayer.nativeElement.pause();
    } else {
      this.videoplayer1.nativeElement.pause();
    }
	this.ifAudioAutoPlay=false;
  }
  startTimer() {
    var totalTime=AppSettings.totalTimeLeft;
    if(this.isLiveQuiz){
      totalTime=AppSettings.totalTimeLeftForLiveQuiz;
    }
    var totalTimeInMilli=totalTime*1000;
	  var timeDecreaseInMilli=totalTime*10;
	  var timePercentDecrease=timeDecreaseInMilli*100/totalTimeInMilli;
    var progressDecrease=100*timePercentDecrease/100;
    var totalCounter=100/totalTime;
    var counter=0;
    console.log(timePercentDecrease);
    console.log(progressDecrease);
    this.interval = setInterval(() => {
      this.progress-=progressDecrease;
 counter++;
      if(totalCounter<counter){
        console.log("progress decreased by 1");
        this.timeLeft--;
        counter=0;
      }
     else if(this.timeLeft==0){
      this.isDisabled=true;
       this.pauseTimeAndAudio();
       if(this.isLiveQuiz){
this.openSuccessDialog();
       }
       else {this.wrongAnswer(0);}
        
       
     
      }
    }, timeDecreaseInMilli);
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
