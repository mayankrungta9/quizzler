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
	 points="";
	 start_pos_y=29;
	 start_pos_x=0;
	 div_height=0;
	 div_width=0;
	 
constructor(       
   private httpClientService: HttpClientService,
	public  router: Router ,
  ) { }
ngOnInit() {
	
//	 this.httpClientService.loadGame(6).subscribe(
  //   response => this.handleSuccessfulResponse(response),
  //  );
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
	 
	 this.height=(100)/this.row;
	 this.width=(100)/this.column;

	/// console.log(document.getElementById('1').offsetWidth);
	 //console.log(document.getElementById('1').offsetHeight);
	}
	ngAfterViewInit(){
setTimeout(()=>{

	this.div_height=document.getElementById('1').offsetHeight;
	thi.div_width=document.getElementById('1').offsetWidth
	console.log(document.getElementById('1').offsetWidth);
	console.log(document.getElementById('1').offsetHeight);
},1000);
	}
 handleSuccessfulResponse(response) {
    this.celebGameData=response;
	console.log(this.celebGameData);
  }
  
   mouseEnter(event){
		console.log(document.getElementById('div1'));
	       var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  this.getDiv(x,y);
 
 
 // console.log(this.points);
   }
   getDiv(x,y){
	console.log(document.getElementById('1').offsetWidth);
	console.log(document.getElementById('1').offsetHeight);
var x_pos=x-this.start_pos_x;
var y_pos=y-this.start_pos_y;
var x_index=Math. trunc(x_pos/this.div_width);
var y_index=Math. trunc(y_pos/this.div_height);
//this.points = x_index+","+y_index+" "+(x_index*3+y_index);
this.points = x_pos+","+y_pos+" "+x_index+","+y_index;
////document.getElementById(x_index+y_index*3).classList.add('background');
console.log(x_pos+","+y_pos);
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

