import { Component, OnInit,ViewChild,AfterViewInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService, CelebMemGameDto,CelebMemGameAndLevelDto, UserCategoryData, UserData} from '../../../service/httpclient.service';
import { MatDialog } from '@angular/material/dialog';
import { success } from '../../../quizzler/ts/success-component';
import { GameOver } from '../../../quizzler/ts/gameOver-component';
import { ButtonClickDirectiveDirective } from '../../../button-click-directive.directive';
import { LoginComponent } from '../../../quizzler/ts/login.component';
import { CategoryCompleted } from '../../../quizzler/ts/categoryCompleted';
@Component({
  selector: 'FindPairGameComponent',
  templateUrl: '../html/FindPairGame.Component.html',
  styleUrls: ['../css/FindPairGame.css']
})

export class FindPairGameComponent implements OnInit, AfterViewInit {
	 
	
	
	 celebGameData:CelebMemGameDto;
	 celebGameDataObj:CelebMemGameDto;
	 celebMemGameAndLevelDto:CelebMemGameAndLevelDto;
	 front:true;
	 card1=-1;
	 card2=-1;
	 cardId1=-1;
	 cardId2=-1;
	 height=0;
	 width=0;
	 row=0;
	 column=0;
	 userCategoryData: UserCategoryData;
	 userName;
	 coins=0;
level=0;
isLoaderVisible=true;
progress=100;
timeCounter=0;
bonusTimer=5;
displayTimer=0;
interval;
gameInterval;
totalImage=0;
flipCards=0;
levelCleared=false;
gameWrapperWidth=0;
gameData;
index=0;
bgArray=["#f9c938","#226e71","#6f1f6c"];
cardImgArray=["card-bg1.jpg","card-bg2.jpg","card-bg3.jpg"];
correctSubLevel=0;
totalSubLevel=2;
timeUp=false;
showMemorizeCard=false;
audio = new Audio();
currentUnlockedLevel:number;
	totalLevel: number;
constructor(       
   private httpClientService: HttpClientService,
	public  activatedrouter: ActivatedRoute ,
	public  router: Router ,
	private userData:UserData,
	private dialog: MatDialog,
  ) { }
  @HostListener('window:popstate', ['$event'])
   onPopState(event) {
	clearInterval(this.gameInterval);
	clearInterval(this.interval);
	console.log("clearing game interval time"+this.gameInterval);
   }
ngOnInit() {
	this.audio.src = "../../../assets/audio/click.mp3";
	this.httpClientService.onHomePage=false;
	//this.openGameOverDialog();	
	//this.openSuccessDailog();
	this.audio.load();
	
	this.userName = this.userData.userId;
	this.httpClientService.level = +this.activatedrouter.snapshot.paramMap.get('level');
	this.currentUnlockedLevel = +this.activatedrouter.snapshot.paramMap.get('currentUnlockedLevel');
	this.level=this.httpClientService.level;
	this.totalLevel = +this.activatedrouter.snapshot.paramMap.get('totalLevel');
	 this.loadGameData();
  
	}

	private loadGameData() {
		this.correctSubLevel=0;
		this.httpClientService.loadGame(this.level).subscribe(response => {
			this.handleSuccessfulResponse(response);
			this.loadNextLevel();
		}
			);
	}

	reset(){
		var htmlCollection = document.querySelectorAll(".transform");
	
		for (var i = 0; i < htmlCollection.length; i++) {
			var element = <HTMLElement>htmlCollection.item(i);
			
			element.classList.remove('transform');
		}
		this.displayTimer=this.timeCounter;
		this.progress=100;
		this.showMemorizeCard=false;

		this.startGameTimer();
	}
	saveUserProgress() {
		this.userCategoryData = new UserCategoryData(this.userName, 12, this.level+1);
		
	this.userData.coins+=this.coins;
	this.coins=0;
	if(this.currentUnlockedLevel<this.userCategoryData.level){
		this.httpClientService.saveUserCategoryLevel(this.userCategoryData).subscribe();
	}
		
		this.httpClientService.updateUser(this.userData, 'updateUser').subscribe(	
			response=>{
				this.userData.cloneUserData(response);
				
			   }
		);
	  }
	ngAfterViewInit(){
		this.gameWrapperWidth=document.getElementById('game-wrapper').offsetWidth;
	}
	loadNextLevel() {
		this.levelCleared=false;
		
		this.progress=100;
		this.celebGameData=this.celebMemGameAndLevelDto.celebMemAndGameDto;
		this.celebGameDataObj=this.celebGameData[this.index];
		console.log(this.celebGameData);
		this.row=this.celebMemGameAndLevelDto.row;
		this.column=this.celebMemGameAndLevelDto.column;
		this.totalImage=this.row*this.column/2;
		
		this.timeCounter=this.celebMemGameAndLevelDto.time;

		//this.height=(98-this.row*2-3)/this.row;
var totalPer=100;
		if(this.column==2){
			totalPer=80;	
		}
		var widthPer=(totalPer-this.column*2-1)/this.column;
		this.width= Math.floor(this.gameWrapperWidth*widthPer/100);
		 this.height=this.width;
	this.displayTimer=this.bonusTimer;
	this.loadAllImage();
	
	
	
	
	}
	loadAllImage(){
		var isAllImageLoaded=true;

	 
	var interval = setInterval(() => {
		
	
		for (var i = 0; i < this.totalImage*2; i++) {
			var x = <HTMLImageElement>document.getElementById("game-img"+i)
			if(!x.complete){
				console.log("game-img"+i);
			}
			
			isAllImageLoaded=isAllImageLoaded && x.complete;
			
		}
if(isAllImageLoaded){
	
	clearInterval(interval);
	this.isLoaderVisible=false;
	this.startBonusTimer();	
	this.showMemorizeCard=true;
}
else{
	isAllImageLoaded=true;
}
	}, 100);	

		
	}
 handleSuccessfulResponse(response) {
	this.celebMemGameAndLevelDto=response;
	
	 
  }
  startBonusTimer(){
	  
	this.interval= setInterval(() =>{
		this.progress-=100/(this.bonusTimer*10)
		if(this.progress % 20 ==0){
			this.displayTimer--;
		}
		if(this.progress<=0){
			this.reset();
			clearInterval(this.interval);
		}
	}, 100);
	
  }

  startGameTimer(){
	 
	  var totalTimeInMilli=this.timeCounter*1000;
	  var timeDecreaseInMilli=100;
	  var timePercentDecrease=timeDecreaseInMilli*100/totalTimeInMilli;
	  var progressDecrease=100*timePercentDecrease/100;
	  
	  
	 this.gameInterval= setInterval(() =>{
		 console.log(this.gameInterval);
		this.progress-=progressDecrease;
		
		if(this.progress % (100/this.timeCounter) ==0){
			this.displayTimer--;
		}
		
		if(this.progress<=0){
			
			
			//this.openGameOverDialog();
			clearInterval(this.gameInterval);
			this.timeUp=true;
			setTimeout(()=>this.loadNextTask(),1000);
			
		}
	}, timeDecreaseInMilli);
	
  }

	private increaseProgress() {
		var timeIncrease = 3;
		var bonusPercent = timeIncrease * 100 / this.timeCounter;
		console.log(bonusPercent);
		this.progress += bonusPercent;
		this.displayTimer += timeIncrease;
	}

 
openGameOverDialog() {
	this.httpClientService.loadAds("loadAd2").subscribe();
	var self=this;
    this.dialog.open(GameOver, {
      data: self.coins,
	  height: '50%',
  width: '95%',
    }).afterClosed().subscribe(response => {
		
      if (response === 're-play') {
        setTimeout(() => {
			this.loadNextLevel();
        
        }, 1000);
      } else {
       this.router.navigate(['']);
      }
    });
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
  openSuccessDailog(){
	this.httpClientService.loadAds("loadAd2").subscribe();
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
openSuccessNextLevelDialog(){
	
	var self=this;
    this.dialog.open(success, {
      data: self.coins,
	  height: '60%',
  width: '95%',
  disableClose: true,
    }).afterClosed().subscribe(response => {
		
      if (response == 'continue') {
        setTimeout(() => {
			self.isLoaderVisible=true;
			this.httpClientService.level +=1;
			this.level=this.httpClientService.level;
          this.loadGameData();
        }, 1000);
      } else {
       this.router.navigate(['' ]);
      }
    });
}
flipCard( element:HTMLElement,index,id:number)
{
	this.audio.play();
   var  myElement = document.getElementById(index);
if(!myElement.classList.contains('transform')){
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
		  this.increaseProgress();
		  this.flipCards++;
		  if(this.flipCards==this.totalImage){
			  this.correctSubLevel++;
			 setTimeout(()=>{ this.loadNextTask();},1000);
			 
		  }
  }
}
}
	loadNextTask() {
		clearInterval(this.gameInterval);
		this.timeUp=false;
		this.isLoaderVisible=true;
		this.index++;
		this.flipCards=0;	
		this.card1=-1;
	this.card2=-1;
	this.cardId1=-1;
	this.cardId2=-1;			
		if(this.index>2)
		{
			this.levelCleared=true;
			this.index=0;
			this.coins=this.correctSubLevel*10
			this.saveUserProgress();
			if(this.correctSubLevel>=this.totalSubLevel){
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
		else {
			
			console.log(this.index);	
			this.loadNextLevel();
		}
	}

}
