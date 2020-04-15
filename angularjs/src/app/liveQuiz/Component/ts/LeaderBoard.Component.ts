import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LiveQuizService,PrizeRankBoard,LiveQuizPoints} from '../../../service/liveQuiz.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'LeaderBoard',
  templateUrl: '../html/LeaderBoard.Component.html',
  styleUrls: ['../css/LiveQuiz.css']
})

export class LeaderBoard implements OnInit, AfterViewInit {
	 liveQuizPoints:LiveQuizPoints;
  
categoryId: number;

isLoaderVisible=true;
 @Input('quizId') quizId: number;

constructor(       
      
	
	public  router: Router ,
	 private liveQuizService: LiveQuizService,   
  ) { }
ngOnInit() {
 this.liveQuizService.loadLiveQuizLeaderBoard(this.quizId).subscribe(
     response => this.handleSuccessfulResponse(response),
    );

	}
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    this.liveQuizPoints=response;
this.isLoaderVisible=false;
  }
  

	  
 
}

