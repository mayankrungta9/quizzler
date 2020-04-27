import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService, PathFinderDto} from '../../../service/httpclient.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'GameComponent',
  templateUrl: '../html/Game.Component.html',
  styleUrls: ['../css/Game.css']
})

export class GameComponent implements OnInit, AfterViewInit {
	 
	background:'green';
	interval;
	 gameData:number[];
	 pathFinderDtoArray:PathFinderDto[];
	 pathFinderDto:PathFinderDto;
	 front:true;
	 card1=-1;
	 card2=-1;
	 cardId1=-1;
	 cardId2=-1;
	 height=0;
	 width=0;
	 row=0;
	 column=0;
	 points="";
	 start_pos_y=0;
	 start_pos_x=0;
	 div_height=0;
	 div_width=0;
	 leftMove=0;
	 bottomMove=0;
	 startMoveFlag=false;
	  route=[];
	 index=0;
	  lastElement:HTMLElement[]=[];
	  startPosition=0;
	  target=0;
	  obstacle=[4,5,7];
	  result="";
	  isCharacterVisible=false;
	  isObstacleVisible=true;
	  gameLevelIndex=0;
	  progress=0;	
	  showSpinner=true;
constructor(       
   private httpClientService: HttpClientService,
	public  router: Router ,
  ) { }
ngOnInit() {
	
	 this.httpClientService.loadPathFinderData(1).subscribe(
     response => this.handleSuccessfulResponse(response),
    );
  
	 
	 
	 
	
	}
	checkForObstacle(index){
return this.obstacle.filter(x=>this.check(x,index)).length >0 ?true :false;
	}

	check(index,x){
		return x==index;
	}
	
	
ngAfterViewInit(){

	}


	next(){
		console.log("in next");
		this.resetStyle();
		this.isCharacterVisible=false;
		//this.interval= setInterval(() =>{
			//this.progress+=10;
			//console.log(this.progress);
		//}, 500);
		//console.log(this.interval);
		setTimeout(()=>{
			//console.log(this.interval);
			this.isObstacleVisible=false;
			this.isCharacterVisible=true;
			clearInterval(this.interval);
			this.progress=0;
			this.showSpinner=false;
		},5000);
		this.result="";
		this.pathFinderDto=this.pathFinderDtoArray[this.gameLevelIndex++]
		console.log(this.gameLevelIndex);
		this.row=this.pathFinderDto.row;
		this.column=this.pathFinderDto.column;
		this.gameData=Array(this.row*this.column);
		//console.log(this.pathFinderDto);
		this.width=(100)/this.column;
		this.startPosition=this.pathFinderDto.pathArray[0];
		this.target=this.pathFinderDto.pathArray[this.pathFinderDto.pathArray.length-1];
		this.obstacle=this.pathFinderDto.obstaclePosArray;
		setTimeout(()=>{
			
			this.height=document.getElementById('1').offsetWidth;
			
			this.div_height=document.getElementById('1').offsetWidth;
			this.div_width=document.getElementById('1').offsetWidth
			var element =<HTMLElement> document.getElementById('game-wrapper');
			this.start_pos_y=element.offsetTop;
			this.start_pos_x=element.offsetLeft;
			
		},100);	
	}
 handleSuccessfulResponse(response) {
	this.pathFinderDtoArray=response;
	this.next();
	
  }
  mouseEnter(event){

	var x = event.touches[0].clientX;
	var y = event.touches[0].clientY;
	var x_pos=x-this.start_pos_x;
  var y_pos=y-this.start_pos_y;
  var x_index=Math. trunc(x_pos/this.div_width);
  var y_index=Math. trunc(y_pos/this.div_height);
  var y_start=Math.trunc(this.startPosition/this.column);
  var x_start =this.startPosition%this.column;

		if(x_index==x_start && y_index==y_start)
		{
			
			this.startMoveFlag=true;
			document.getElementById((x_index+(y_index*this.column))+"").style.background='linear-gradient(90deg, rgb(192, 66, 214), rgb(103, 58, 183))';
			this.route.push(this.startPosition);
			this.index=0;
		}

		this.bottomMove=y_index;
		this.leftMove=x_index;
	
		
  }
  mouseRemoved(event){
	
	this.startMoveFlag=false;
	


	if(this.route[this.index] != this.target ){
	 
		setTimeout(() => {
		this.resetStyle();
	}, 1000);
}


  }
	private resetStyle() {
		this.showSpinner=true;
		this.progress=0;
			var htmlCollection = document.getElementsByClassName('line');
			for (var i = 0; i < htmlCollection.length; i++) {
				var element = <HTMLElement>htmlCollection.item(i);
				element.style.height = '0px';
				element.style.width = '0px';
				element.classList.remove('line-bottom');
				element.classList.remove('line-right');
			}
			this.route = [];
			htmlCollection = document.getElementsByClassName('div1');
			for (var i = 0; i < htmlCollection.length; i++) {
				var element = <HTMLElement>htmlCollection.item(i);
				element.style.background = 'green';
			}
		
	}

  mouseMove(event){
	
 var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  
  if(this.startMoveFlag){
	  console.log('true');
  this.getDiv(x,y);
  }

   }
   getDiv(x,y){
	
var x_pos=x-this.start_pos_x;
var y_pos=y-this.start_pos_y;
var x_index=Math.trunc(x_pos/this.div_width);
var y_index=Math.trunc(y_pos/this.div_height);

if(this.route[this.index] == this.target ){
	var self=this;
	
	var outputArray = this.obstacle.filter(function(item) {
		return self.route.includes(item); 
	  });
	  if(outputArray.length>0)
	  {
		  this.result="fail";
	  }
	  else{
		  this.result="pass";
	  }

this.isObstacleVisible=true;	
	  setTimeout(() => {
		  this.next();
	  }, 2000);
}	else{
	   	   this.newMethod(x_index, y_index);
}
   }
   
  

	private newMethod(x_index: number, y_index: number) {
		if (x_index - this.leftMove == 1  && x_index<this.column) {
			var element = document.getElementById("line-" + (x_index + (y_index * this.column) - 1) + "");
			this.setBackGrounfAndLine(x_index, y_index, element, true);
		}
		else if (x_index - this.leftMove == -1) {
			var element = document.getElementById("line-" + (x_index + (y_index * this.column)) + "");
			this.setBackGrounfAndLine(x_index, y_index, element, true);
		}
		else if (y_index - this.bottomMove == 1) {
			var element = document.getElementById("line-" + (x_index + ((y_index - 1) * this.column)) + "");
			this.setBackGrounfAndLine(x_index, y_index, element, false);
		}
		else if (y_index - this.bottomMove == -1) {
			var element = document.getElementById("line-" + (x_index + ((y_index) * this.column)) + "");
			this.setBackGrounfAndLine(x_index, y_index, element, false);
		}
	}

	private setBackGrounfAndLine(x_index: number, y_index: number,element:HTMLElement,isHorizontal:boolean) {
		var id=(x_index + (y_index * this.column));
		
		
		if(this.route[this.index-1] === id )
		{
			document.getElementById(this.route[this.index]  + "").style.background = 'green';
			if(isHorizontal){
				var temp=this.lastElement.pop();
				temp.classList.remove('line-right');
				temp.style.width=this.div_width+'px'
		this.leftMove=x_index;
		
				
			}else{
				var temp=this.lastElement.pop();
				temp.classList.remove('line-bottom');
		
				temp.style.height=this.div_height+'px'
			this.bottomMove=y_index;
			
				
			}
			//var lineElement=document.getElementById("line-"+this.route[this.index-1]  + "");
			//console.log(lineElement);
			this.route.splice(this.index);
			
			console.log('back');
			this.index--;
			console.log(this.route);
			console.log(this.index);
			
			
		}
		else {
			this.index++;
			document.getElementById(id + "").style.background = "#6751e4";
			//document.getElementById(id + "").style.background = "linear-gradient(90deg, rgb(192, 66, 214), rgb(103, 58, 183))";
			this.route.push((x_index + (y_index * this.column)));
			console.log(this.route);
			console.log(this.index)
				
		if(isHorizontal){
		element.classList.add('line-right');
		element.style.width=this.div_width+'px'
		this.leftMove=x_index;
		this.lastElement.push(element);
		}

		else {
			element.classList.add('line-bottom');
		
			element.style.height=this.div_height+'px'
			this.bottomMove=y_index;
			this.lastElement.push(element);
		}
	}
}
}

