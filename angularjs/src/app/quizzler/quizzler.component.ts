import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClientService, Quizes, UserCoins } from '../service/httpclient.service';
import { Router } from '@angular/router';
import { AppError } from '../common/app.error';

@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: './quizzler.component.html',
  styleUrls: ['./quizzler.component.css'],
  host: { 'window:beforeunload': 'test' }
})
export class QuizComponent implements OnInit {


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
  
  remainingLives = 2;
  correctAnswer = 0;
  coins = 0;
  testing = false;
  result: String;
  buttonCss: Number[] = [0, 0, 0, 0];
  constructor(
    private httpClientService: HttpClientService,
    public activatedrouter: Router,
  ) { }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    window.location.reload();

  }
  ngOnInit() {

    this.audio.src = "../assets/audio/error.mp3";
    this.audio.load();
    this.httpClientService.loadQuizes(this.httpClientService.userCategoryData).subscribe(
      response => this.handleSuccessfulResponse(response),
      (error: any) => {
        if (error instanceof AppError) {
          console.log("some thing app missing")
        }
        else throw error;
      }
    );
    // this.startTimer(); commented for testing



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
      this.result == "answer is correct";
      if(this.correctlyAnsweredQues<this.totalQuestion){
      setTimeout(() => {
        this.next();
      }, 2000)
    }else {

      this.saveUserProgress();
    //  this.activatedrouter.navigate(['success']);
    }
    }
    else {

      this.wrongAnswer(selectedAnswer);
    }

  };

  saveUserProgress(){
    
    this.httpClientService.saveUserCategoryLevel().subscribe();
    this.httpClientService.saveUserCoins(this.coins).subscribe();
  }
  wrongAnswer(selectedAnswer) {
    var correctAnswer: number = this.quizes[this.index].answer;
    this.liveClassesArray[this.remainingLives] = "heart-img-blank";

    this.audio.play();
    this.coins -= 50;
    this.remainingLives--;
    if (this.remainingLives <0) {
      this.activatedrouter.navigate(['gameOver']);
    }
    if (selectedAnswer != 0) {
      this.buttonCss[selectedAnswer - 1] = 2;
    }

    this.buttonCss[correctAnswer - 1] = 1;
    setTimeout(() => {
      this.next();
    }, 2000)
  }
  next() {
    
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

