import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LiveQuizService,PrizeRankBoard,LiveQuizPoints} from '../../../service/liveQuiz.service';
import { MatDialog } from '@angular/material/dialog';
import { UserData } from '../../../service/httpclient.service';
@Component({
  selector: 'LeaderBoard',
  templateUrl: '../html/LeaderBoard.Component.html',
  styleUrls: ['../css/LiveQuiz.css']
})

export class LeaderBoard implements OnInit, AfterViewInit {
	 liveQuizPoints:LiveQuizPoints;
  yourRank:LiveQuizPoints;
  highestRank:LiveQuizPoints;
categoryId: number;

isLoaderVisible=true;
 @Input('quizId') quizId: number;
 @Input('liveQuizPoints') quizPoints: number;
constructor(       
      
	private userData:UserData,
	public  router: Router ,
	 private liveQuizService: LiveQuizService,   
  ) { }
ngOnInit() {
 this.liveQuizService.loadLiveQuizLeaderBoard(this.quizId).subscribe(
     response => this.handleSuccessfulResponse(response),
    );
    this.liveQuizService.getHighestRank(this.quizId,this.userData.userId).subscribe(
      response=>{
        this.highestRank=response;
      }
     );
 
     if(this.quizPoints!=-1){
     this.liveQuizService.getCurrentRank(this.quizId,this.quizPoints).subscribe(
      response=>{
        this.yourRank=response;
      }
     );
    }

	}
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    this.liveQuizPoints=response;
this.isLoaderVisible=false;
  }
  

	  
 
}

