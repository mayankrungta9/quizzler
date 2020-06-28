import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { currencyPipe } from '../../../common/currencyPipe';
import {  UserData, HttpClientService} from '../../../service/httpclient.service';
import { LiveQuizService, LiveQuizCategory} from '../../../service/liveQuiz.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'ShowLiveQuizes',
  templateUrl: '../html/ShowLiveQuizes.Component.html',
  styleUrls: ['../css/LiveQuiz.css']
})

export class ShowLiveQuizes implements OnInit, AfterViewInit {
	 categories: LiveQuizCategory;
  
categoryId: number;
iscategoryvisible = true;
userCurrentLevel: number;
isLoaderVisible=true;
userName="";
constructor(       
    private liveQuizService: LiveQuizService,   
    private httpClientService: HttpClientService,
	public  router: Router ,
  ) { }
ngOnInit() {
 this.liveQuizService.loadLiveQuizCategory().subscribe(
     response => this.handleSuccessfulResponse(response),
    );

	}
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    this.categories = response;
this.isLoaderVisible=false;
  }
  
  selectCategory(liveQuizCategory: LiveQuizCategory) {
this.httpClientService.liveQuizCoins=liveQuizCategory.entryfee;
     this.router.navigate(['showLiveQuizes/showRanking',  liveQuizCategory.id,liveQuizCategory.type,-1]);
      }
	  
 
}

