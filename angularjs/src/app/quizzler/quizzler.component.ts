import { Component, OnInit } from '@angular/core';
import { HttpClientService, Quizes } from '../service/httpclient.service';


 





@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: './quizzler.component.html',
  styleUrls: ['./quizzler.component.css']
})
export class QuizComponent implements OnInit {
  
 
   audio = new Audio();
   
   

  timeLeft: number = 30;
  interval;
  gameOver:boolean=false;
  subscribeTimer: any;
  quizes:Quizes[];
  liveClassesArray:String[];
    index=0;
    remainingLives=2;
    correctAnswer=0;
    coins=0;
    
   result:String;
   buttonCss:Number[]=[0,0,0,0];
  constructor(
    private httpClientService:HttpClientService,
    
  ) { }

  ngOnInit() {
    this.audio.src = "../assets/audio/error.mp3";
    this.audio.load();
    this.httpClientService.loadQuizes().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
    this.startTimer();
    this.liveClassesArray=["heart-img-filled","heart-img-filled","heart-img-filled"];
 
  }

handleSuccessfulResponse(response)
{
    this.quizes=response;
}

handlesubmitAnswerResponse(result)
{
    this.result=result;
}
onSelectAnswer(answer): void {
  var correctAnswer:number=this.quizes[this.index].answer;
  if(answer==correctAnswer)
    
  {
    this.buttonCss[answer-1]=1;
      this.correctAnswer++;
      this.coins+=100;
      this.result=="answer is correct";
      setTimeout(() => {
        this.next();
      },2000)
      
    }
    else{
      this.liveClassesArray[this.remainingLives]="heart-img-blank";
     
    this.audio.play();
      this.coins-=50;
      this.remainingLives--;
      if(this.remainingLives<=0){
        this.gameOver=true;
      }
      this.buttonCss[answer-1]=2;
      this.buttonCss[correctAnswer-1]=1;
      setTimeout(() => {
        this.next();
      },2000)
    }
    
};

next(){
  this.buttonCss=[0,0,0,0]
  this.index++;
  console.log(this.quizes[this.index].type);
  this.timeLeft=30;
  this.startTimer();
  if(this.quizes[this.index].type=='audio'){
  this.playSound();
  }
}

playSound(): void {
  var audio = new Audio(this.quizes[this.index].url);
 
  audio.load();
        audio.play();
};



startTimer() {
 
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
 
      this.timeLeft--;
    } else {
    
      this.gameOver=true;
    }
  },1000)
}

pauseTimer() {
  clearInterval(this.interval);
}
}

