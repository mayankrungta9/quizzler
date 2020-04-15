import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LiveQuizService,PrizeRankBoard} from '../../../service/liveQuiz.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'PrizeMatrix',
  templateUrl: '../html/PrizeMatrix.Component.html',
  styleUrls: ['../css/LiveQuiz.css']
})

export class PrizeMatrix implements OnInit, AfterViewInit {
	 prizeRankBoard: PrizeRankBoard;
  @Input('quizId') quizId: number;

iscategoryvisible = true;

isLoaderVisible=true;
userName="";
constructor(       
    private liveQuizService: LiveQuizService,   
	
	public  router: Router ,
  ) { }
ngOnInit() {
	 ;
 this.liveQuizService.loadPrizeMatrix(this.quizId).subscribe(
     response => this.handleSuccessfulResponse(response),
    );

	}
	ngAfterViewInit(){
		//this.isLoaderVisible=false;
	}
 handleSuccessfulResponse(response) {
    this.prizeRankBoard = response;
this.isLoaderVisible=false;
  }
  
  
	  
 
}

