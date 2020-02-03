import { Component, OnInit } from '@angular/core';
import { HttpClientService, Quizes } from '../service/httpclient.service';


 





@Component({
  selector: 'sdasdapp-employeefdfdsf',
  templateUrl: './quizzler.component.html',
  styleUrls: ['./quizzler.component.css']
})
export class QuizComponent implements OnInit {
  
 
   audio = new Audio();
   questionAudio=new Audio();
   

  timeLeft: number = 15;
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
    if(this.quizes[this.index].type=='audio'){
      this.playSound();
      }
}

handlesubmitAnswerResponse(result)
{
    this.result=result;
}
onSelectAnswer(selectedAnswer): void {
  this.questionAudio.pause();
  this.pauseTimer();
  var correctAnswer:number=this.quizes[this.index].answer;
  if(selectedAnswer==correctAnswer)
    
  {
    this.buttonCss[selectedAnswer-1]=1;
      this.correctAnswer++;
      this.coins+=100;
      this.result=="answer is correct";
      setTimeout(() => {
        this.next();
      },2000)
      
    }
    else{
     this.wrongAnswer(selectedAnswer);
    }
    
};

wrongAnswer(selectedAnswer){
  var correctAnswer:number=this.quizes[this.index].answer;
  this.liveClassesArray[this.remainingLives]="heart-img-blank";
     
  this.audio.play();
   this.coins-=50;
   this.remainingLives--;
   if(this.remainingLives<=0){
     this.gameOver=true;
   }
   if(selectedAnswer!=0){
   this.buttonCss[selectedAnswer-1]=2;
  }

   this.buttonCss[correctAnswer-1]=1;
   setTimeout(() => {
     this.next();
   },2000)
}
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
  this.questionAudio.src="/assets/audio/sample.mp3" 
  this.questionAudio.load();
  this.questionAudio.play();
};



startTimer() {
 
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
 
      this.timeLeft--;
    } else {
    this.wrongAnswer(0);
      this.gameOver=true;
      this.pauseTimer();
    }
  },1000)
}

pauseTimer() {
  clearInterval(this.interval);
}
}

