import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService, PathFinderDto, UserCategoryData, UserData} from '../../../service/httpclient.service';
import { MatDialog } from '@angular/material/dialog';
import { success } from '../../../quizzler/ts/success-component';
import { GameOver } from '../../../quizzler/ts/gameOver-component';
import { LoginComponent } from '../../../quizzler/ts/login.component';
import { CategoryCompleted } from '../../../quizzler/ts/categoryCompleted';
@Component({
  selector: 'FindPathGameComponent',
  templateUrl: '../html/FindPathGame.Component.html',
  styleUrls: ['../css/FindPathGame.css']
})

export class FindPathGameComponent implements OnInit, AfterViewInit {
	 

	interval;
	timeCounter=5;
	 gameData:number[];
	 pathFinderDtoArray:PathFinderDto[];
	 pathFinderDto:PathFinderDto;
	 front:true;
	 card1=-1;
	 card2=-1;
	 cardId1=-1;
	 cardId2=-1;
	 bgArray=["rgb(249, 201, 56)","#226e71","#4d428c"];
	 divBgArray=["#4d428c","#F3A712","#6b686b"];
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
	  levelCompleted=false;
	  
	  level=0;
	  totalQuestion=0;
	  rightAnswer=0;
	  wrongAnswer=0;
	  next_replay_button=false;
	  nextButton=false;
	  gameLoaded=false;
	  userCategoryData: UserCategoryData;
	  categoryId=11;
	  userName="";
	  coins=0;
	  audio = new Audio();
	  currentUnlockedLevel =0;
	  header_height=0;
	totalLevel: number;
constructor(       
   private httpClientService: HttpClientService,
   public activatedrouter: ActivatedRoute,
	public  router: Router ,
	private userData:UserData,
	private dialog: MatDialog,
  ) { }
ngOnInit() {
	this.header_height=window.screen.height/10;
	this.audio.src = "../../../assets/audio/click.mp3";
	this.audio.load();
	this.audio.play();
	this.httpClientService.onHomePage=false;
	this.httpClientService.level = +this.activatedrouter.snapshot.paramMap.get('level');
	this.totalLevel = +this.activatedrouter.snapshot.paramMap.get('totalLevel');
	this.level=this.httpClientService.level;
	this.currentUnlockedLevel = +this.activatedrouter.snapshot.paramMap.get('currentUnlockedLevel');
	
	this.userName = this.userData.userId;
	 this.loadLevel();
  
	}
	private loadLevel() {
		this.httpClientService.loadPathFinderData(this.level).subscribe(response => this.handleSuccessfulResponse(response));
	}

	checkForObstacle(index){
return this.obstacle.filter(x=>x==index).length >0 ?true :false;
	}

	saveUserProgress() {
		this.userCategoryData = new UserCategoryData(this.userName, this.categoryId, this.level+1);
		
	this.userData.coins+=this.coins;
	this.coins=0;
	if(this.level+1 >this.currentUnlockedLevel){
		this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
	}
		this.httpClientService.updateUser(this.userData, 'updateUser').subscribe(	response=>this.userData=response
		);
	  }
	  
	
	
ngAfterViewInit(){

	}


	next(){
		this.isObstacleVisible=true
		this.showSpinner=true;
		this.timeCounter=5;
		
		this.progress=0;
		this.resetStyle();
		this.isCharacterVisible=false;
		
		this.interval= setInterval(() =>{
			this.progress+=2;
			if(this.progress % 20 ==0){
				this.timeCounter--;
			}
		}, 100);
		
		setTimeout(()=>{
			
			this.isObstacleVisible=false;
			this.isCharacterVisible=true;
			clearInterval(this.interval);
			this.progress=0;
			this.showSpinner=false;
		},5000);
		this.result="";
		this.pathFinderDto=this.pathFinderDtoArray[this.gameLevelIndex++]
		
		this.row=this.pathFinderDto.row;
		this.column=this.pathFinderDto.column;
		this.gameData=Array(this.row*this.column);

		this.width=(100)/this.column;
		this.startPosition=this.pathFinderDto.pathArray[0];
		this.target=this.pathFinderDto.pathArray[this.pathFinderDto.pathArray.length-1];
		this.obstacle=this.pathFinderDto.obstaclePosArray;
		setTimeout(()=>{
			
			this.height=document.getElementById('1').offsetWidth;
			
			this.div_height=document.getElementById('1').offsetWidth;
			this.div_width=document.getElementById('1').offsetWidth
			var element =<HTMLElement> document.getElementById('game-wrapper');
			this.start_pos_y=element.offsetTop+this.header_height;
			this.start_pos_x=element.offsetLeft;
			
		},100);	
	}
 handleSuccessfulResponse(response) {
	this.pathFinderDtoArray=response;
	this.totalQuestion=this.pathFinderDtoArray.length;
	this.rightAnswer=0;
	this.wrongAnswer=0;
	this.gameLevelIndex =0;
	this.next_replay_button=false;
	this.nextButton=false;
	this.gameLoaded=true;
	this.next();
	
  }
  mouseEnter(event){
if(!this.showSpinner){
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
			document.getElementById((x_index+(y_index*this.column))+"").style.background='rgb(241,100,56)';
			this.route.push(this.startPosition);
			this.index=0;
		}

		this.bottomMove=y_index;
		this.leftMove=x_index;
	
	}
  }
  mouseRemoved(event){
	
	this.startMoveFlag=false;
	


	if(this.route[this.index] != this.target ){
	 
		setTimeout(() => {
		this.resetStyle();
	}, 100);
}


  }
	private resetStyle() {
		
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
				element.style.background = this.divBgArray[this.gameLevelIndex-1];
			}
		
	}

  mouseMove(event){
	
 var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  
  if(this.startMoveFlag){
	
  this.getDiv(x,y);
  }

   }
   getDiv(x,y){
	
var x_pos=x-this.start_pos_x;
var y_pos=y-this.start_pos_y;
var x_index=Math.trunc(x_pos/this.div_width);
var y_index=Math.trunc(y_pos/this.div_height);

if(this.route[this.index] == this.target && !this.levelCompleted){
	var self=this;
	this.levelCompleted=true;
	var outputArray = this.obstacle.filter(function(item) {
		return self.route.includes(item); 
	  });
	  if(outputArray.length>0)
	  {
		  this.result="fail";
		  this.wrongAnswer+=1;
		  
	  }
	  else{
		  this.result="pass";
		  this.rightAnswer+=1;
		  this.coins+=10;
	  }

this.isObstacleVisible=true;	
	  setTimeout(() => {
		
		this.levelCompleted=false;
		if(this.gameLevelIndex <this.totalQuestion){
			this.next();
		}
		else {
			
			
			this.saveUserProgress();
			if(this.rightAnswer>=this.totalQuestion/2)
			{
				if(this.userData.userId==null || this.userData.userId==''){
					this.openLoginDialog();
				  }
				  else {
					this.openSuccessDailog();
					
				  } 
				
			}
			else {
				
this.openGameOverDialog();
			}
		}
		  
	  }, 1000);
}	else{
	   	   this.setBackgroundWrapper(x_index, y_index);
}
   }
   openLoginDialog() {

	this.dialog.open(LoginComponent,{
	height: '75%',
	width: '95%',
	disableClose: true,
		}).afterClosed().subscribe(response => {
	  if (response != null) {
		this.userData.cloneUserData(response);
	   
		
	  this.userCategoryData.userId=response.userId;
	  
	  this.openSuccessDailog();
	  
	  } else {
		console.log("sorry wrong credential");
	  }
	});
  }
   openGameOverDialog() {
    this.dialog.open(GameOver, {
      data: this.coins,
	  height: '50%',
  width: '95%',
    }).afterClosed().subscribe(response => {
		this.saveUserProgress();
      if (response === 're-play') {
        setTimeout(() => {
			this.loadLevel();
        
        }, 1000);
      } else {
       this.router.navigate(['']);
      }
    });
  }

openSuccessDailog(){
	if(this.totalLevel<=this.httpClientService.level){
		this.openCategoryCompleteddialog();
			}
			else{
				this.openSuccessNextLevelDialog();
			}
	
	
}
openCategoryCompleteddialog() {
  
    this.dialog.open(CategoryCompleted, {
      data: this.coins,
	  height: '50%',
  width: '95%',
  disableClose: true,
    });
  }
	private openSuccessNextLevelDialog() {
		var self = this;
		this.dialog.open(success, {
			data: 100,
			height: '50%',
			width: '95%',
			disableClose: true,
		}).afterClosed().subscribe(response => {
			if (response == 'continue') {
				setTimeout(() => {
					this.httpClientService.level += 1;
					this.level = this.httpClientService.level;
					this.loadLevel();
				}, 1000);
			}
			else {
				this.router.navigate(['']);
			}
		});
	}

	private setBackgroundWrapper(x_index: number, y_index: number) {
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
		this.audio.play();
		
		if(this.route[this.index-1] === id )
		{
			document.getElementById(this.route[this.index]  + "").style.background = this.divBgArray[this.gameLevelIndex-1];
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
			
			this.route.splice(this.index);
			
			
			this.index--;
			
			
			
		}
		else {
			this.index++;
			document.getElementById(id + "").style.background = "rgb(241,100,56)";
			//document.getElementById(id + "").style.background = "linear-,radient(90deg, rgb(192, 66, 214), rgb(103, 58, 183))";
			this.route.push((x_index + (y_index * this.column)));
			
				
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

