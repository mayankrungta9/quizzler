import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService, CelebMemGameDto} from '../../../service/httpclient.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'GameComponent',
  templateUrl: '../html/Game.Component.html',
  styleUrls: ['../css/Game.css']
})

export class GameComponent implements OnInit, AfterViewInit {
	 
	
	 gameData:Array<{id: string, url: string}>;
	 celebGameData:CelebMemGameDto;
	 front:true;
	 card1=-1;
	 card2=-1;
	 cardId1=-1;
	 cardId2=-1;
	 height=0;
	 width=0;
	 row=4;
	 column=3;
constructor(       
   private httpClientService: HttpClientService,
	public  router: Router ,
  ) { }
ngOnInit() {
	
	 this.httpClientService.loadGame(6).subscribe(
     response => this.handleSuccessfulResponse(response),
    );
   this.gameData=[
				{"id":"1","url":"../../../assets/images/sallu.jpg"},
				{"id":"2","url":"../../../assets/images/actress.png"},
				{"id":"1","url":"../../../assets/images/sallu.jpg"},
				{"id":"3","url":"../../../assets/images/movie.png"},
				{"id":"2","url":"../../../assets/images/actress.png"},
				{"id":"3","url":"../../../assets/images/movie.png"},
				{"id":"1","url":"../../../assets/images/sallu.jpg"},
				{"id":"2","url":"../../../assets/images/actress.png"},
				{"id":"1","url":"../../../assets/images/sallu.jpg"},
				{"id":"3","url":"../../../assets/images/movie.png"},
				{"id":"2","url":"../../../assets/images/actress.png"},
				{"id":"3","url":"../../../assets/images/movie.png"},
				
	 ];
	 
	 this.height=(98-this.row*2-3)/this.row;
	 this.width=(100-this.column*2-1)/this.column;
	 console.log(this.height);
	 console.log(this.width);
	}
	ngAfterViewInit(){}
 handleSuccessfulResponse(response) {
    this.celebGameData=response;
	console.log(this.celebGameData);
  }
  
  flipCard( element:HTMLElement,index,id:number)
  {
	  
	 var  myElement = document.getElementById(index);	
	if( this.card1==-1) {
	  myElement.classList.add('transform');
	  this.card1=index;
	  this.cardId1=id;
	}
	else if( this.card2==-1){
		 myElement.classList.add('transform');
	   this.card2=index;
	    this.cardId2=id;
	}
	else {
		if(this.cardId1 != this.cardId2){
		myElement = document.getElementById(this.card1+"");
		myElement.classList.remove('transform');
		
		myElement = document.getElementById(this.card2+"");
		myElement.classList.remove('transform');
		}	
		
		myElement = document.getElementById(index);
		myElement.classList.add('transform');
	  this.card1=index;
	  this.card2=-1;
	  this.cardId1=id;
	  this.cardId2=-1;	
		
	}
	
	if(this.cardId1 == this.cardId2){ 
	myElement = document.getElementById('game-img'+this.card1);
			myElement.classList.add('heart');
			myElement.classList.add('green-border');
			console.log(myElement);
		myElement = document.getElementById('game-img'+this.card2);
		
			myElement.classList.add('heart');
			myElement.classList.add('green-border');
			console.log(myElement);
	}
  }
}

