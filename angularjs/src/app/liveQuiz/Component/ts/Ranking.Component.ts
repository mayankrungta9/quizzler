import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';
import {  UserData, HttpClientService} from '../../../service/httpclient.service';
@Component({
  selector: 'LoginComponent',
  templateUrl: '../html/Ranking.Component.html',
  styleUrls: ['../css/LiveQuiz.css']
})

export class Ranking implements OnInit, AfterViewInit {
	
  quizId:number;
  categoryId:number;
isPrizeMatrix:boolean=false;
userName="";
isLoaderVisible=false;
constructor(       
public activatedrouter: ActivatedRoute,
private httpClientService: HttpClientService,
	public  router: Router ,
	private userData:UserData,
  ) { }
ngOnInit() {
 this.quizId=+this.activatedrouter.snapshot.paramMap.get('quizId');
 this.categoryId=+this.activatedrouter.snapshot.paramMap.get('categoryId');
 this.httpClientService.onHomePage=false;
	}
	
  ngAfterViewInit(){
	  
  }
  loadLiveQuiz(){
	  if(this.userData.userId==null || this.userData.userId===''){
		this.userName='Guest';
	}
	else {
		this.userName=this.userData.userId;
	}
	  this.router.navigate(['quiz', this.userName, this.quizId+","+this.categoryId, -1,-1,-1 ]);
  }
  onswitchBoard(i:number){
	  if(i==1)
	  {
		  this.isPrizeMatrix=true;
	  }
	  else {
		  this.isPrizeMatrix=false;
	  }
  }
	  
 
}

