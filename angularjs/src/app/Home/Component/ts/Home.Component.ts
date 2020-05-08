import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ShowLiveQuizes } from '../../../liveQuiz/Component/ts/ShowLiveQuizes.Component';

@Component({
  selector: 'homeComponent',
  templateUrl: '../html/Home.Component.html',
  styleUrls: ['../css/Home.Component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
	 
isLoaderVisible=true;
category='games'
type="quiz"
constructor(        
      
	
	public  router: Router ,
	
  ) { }
ngOnInit() {
 

	}
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    
this.isLoaderVisible=false;
  }
  

	  
 
}

