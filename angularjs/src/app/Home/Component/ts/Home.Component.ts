import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ShowLiveQuizes } from '../../../liveQuiz/Component/ts/ShowLiveQuizes.Component';
import { HttpClientService } from '../../../service/httpclient.service';

@Component({
  selector: 'homeComponent',
  templateUrl: '../html/Home.Component.html',
  styleUrls: ['../css/Home.Component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
	 
isLoaderVisible=true;
category=this.httpClientService.type;
type=this.httpClientService.type;
constructor(        
       
  private httpClientService: HttpClientService,
	public  router: Router ,
	
  ) { }
ngOnInit() {
  this.httpClientService.onHomePage=true;

  }
  switchMenu(currentCategory){
   
    this.httpClientService.type=currentCategory;
    this.category=currentCategory;
    this.type=currentCategory;
  
  }
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    
this.isLoaderVisible=false;
  }
  

	  
 
}

