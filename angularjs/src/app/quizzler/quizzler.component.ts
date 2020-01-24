import { Component, OnInit } from '@angular/core';
import { HttpClientService, Quizes } from '../service/httpclient.service';
import { timer } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-employee',
  templateUrl: './quizzler.component.html',
  styleUrls: ['./quizzler.component.css']
})
export class QuizComponent implements OnInit {
  timeLeft: number = 15;
  interval;
  gameOver:boolean=false;
  subscribeTimer: any;
  quizes:Quizes[];
    index=0;
    remainingLives=3;
    correctAnswer=0;
    coins=0;
   result:String;
   buttonCss:Number[]=[0,0,0,0];
  constructor(
    private httpClientService:HttpClientService
  ) { }

  ngOnInit() {
    this.httpClientService.loadQuizes().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
    this.startTimer();
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
  
  if(answer==this.quizes[this.index].answer)
    {this.buttonCss[answer-1]=1;
      this.correctAnswer++;
      this.coins+=100;
      this.result=="answer is correct";
      this.next();
    }
    else{
      this.coins-=50;
      this.remainingLives--;
      if(this.remainingLives<=0){
        this.gameOver=true;
      }
      this.buttonCss[answer-1]=2;
    }
    console.log(this.buttonCss[answer-1]);
};

next(){
  this.buttonCss=[0,0,0,0]
  this.index++;
  this.timeLeft=15;
}

playSound(): void {
  var audio = new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
        audio.play();
};

oberserableTimer() {
  const source = timer(1000, 2000);
  const abc = source.subscribe(val => {
    console.log(val, '-');
    this.subscribeTimer = this.timeLeft - val;
  });
}

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

