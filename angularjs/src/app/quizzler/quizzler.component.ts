import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClientService, Quizes, UserCoins, UserCategoryData } from '../service/httpclient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app.error';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShowCategory } from './showCategory';
import { gameOver } from './gameOver-component';
import { saveMe } from './saveMe.component';


@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: './quizzler.component.html',
  styleUrls: ['./quizzler.component.css'],
  host: { 'window:beforeunload': 'test' },
  
})
export class QuizComponent implements OnInit {

  subscriptions:Subscription[] = [];
  audio = new Audio();
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  questionAudio = new Audio();
totalQuestion:number=2;
correctlyAnsweredQues:number=0;
  totalTimeLeft = 15;
  timeLeft: number = this.totalTimeLeft;
  interval;
  isAudio = false;
  gameOver: boolean = false;
  subscribeTimer: any;
  quizes: Quizes[] = [];
  liveClassesArray: String[] = ["heart-img-filled", "heart-img-filled", "heart-img-filled"];
  index = 0;
  buttonAnimationCss1="animated  bounceInLeft delay-5s";
  buttonAnimationCss2="animated  bounceInRight delay-5s";
  remainingLives = 2;
  correctAnswer = 0;
  coins = 0;
  testing = false;
  result: String;
  level:number;
  buttonCss: Number[] = [0, 0, 0, 0];
  userName:string;
  categoryId:number;
  userCategoryData:UserCategoryData;
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: ActivatedRoute,
    public  router: Router ,
    private dialog:MatDialog,
  ) { }
  
  ngOnInit() {
     this.userName = this.activatedrouter.snapshot.paramMap.get("userName");
    this. categoryId = +this.activatedrouter.snapshot.paramMap.get("categoryId");
    this.level = +this.activatedrouter.snapshot.paramMap.get("level");
   this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.level);
  this.loadQuiz();
  //this.startTimer(); 



  }
  openSaveMeDialog(){
   
    this.dialog.open(saveMe).afterClosed().subscribe(response=>{
      if(response=='yes'){
        this.coins-=100;
        setTimeout(() => {
          this.next();
        }, 1000);
      }
      else {
      this.httpClientService.saveUserCoins(this.userName,this.coins).subscribe();
      this.router.navigate(['gameOver']);
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

  ngOnDestroy(){
   
    this.questionAudio.pause();
    this.subscriptions.forEach(s => s.unsubscribe());
    
  }
  handleSuccessfulResponse(response) {
    this.quizes = response;
    if (this.quizes[this.index].type == 'audio') {
      this.isAudio = true;
      this.playSound();
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
      
      if(this.correctlyAnsweredQues<this.totalQuestion){
      setTimeout(() => {
        this.next();
      }, 1000)
    }else {
      this.level+=1;
      this.userCategoryData.level=this.level;
      this.saveUserProgress();
      this.loadQuiz();
    //  this.activatedrouter.navigate(['success']);
    }
    }
    else {

      this.wrongAnswer(selectedAnswer);
    }

  };

  saveUserProgress(){
    
    this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
    this.httpClientService.saveUserCoins(this.userName,this.coins).subscribe();
  }
  wrongAnswer(selectedAnswer) {
    var correctAnswer: number = this.quizes[this.index].answer;
    this.liveClassesArray[this.remainingLives] = "heart-img-blank";

    this.audio.play();
    this.coins -= 50;
    
    if (this.remainingLives <0) {
      this.openSaveMeDialog();
     
    }
    else{
    if (selectedAnswer != 0) {
      this.buttonCss[selectedAnswer - 1] = 2;
    }
    this.remainingLives--;
    //this.buttonCss[correctAnswer - 1] = 1;
    setTimeout(() => {
      this.next();
    }, 1000)
  }
  }
  next() {
    this.buttonAnimationCss1="animated  bounceOutRight delay-2s";
      this.buttonAnimationCss2="animated  bounceOutRight delay-2s";
    
   
      setTimeout(() => {
        this.buttonAnimationCss1="animated  bounceInLeft delay-2s";
        this.buttonAnimationCss2="animated  bounceInRight delay-2s";
      }, )
    
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
  }

  playSound(): void {
    this.questionAudio.src = this.quizes[this.index].url;
    this.questionAudio.loop = true;
    this.questionAudio.load();
    this.questionAudio.play();
  };
  playVideo(): void {
    this.videoplayer.nativeElement.load();
    this.videoplayer.nativeElement.play();

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

