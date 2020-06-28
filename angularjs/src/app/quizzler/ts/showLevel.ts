import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';

import { MatDialog } from '@angular/material/dialog';

@Component({

  templateUrl: '../html/showLevel.html',
  styleUrls: ['./quizzler.component.css']
})

export class ShowLevel implements OnInit, AfterViewInit{

  categories: Category;
  level = Array(0);
   userName: string;
categoryId: number;
iscategoryvisible = true;
userCurrentLevel: number;
isLoaderVisible=true;
totalLevel=0;
type:string;
categoryName="";
  constructor( 
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
	private userData:UserData,

  ) { }

  ngOnInit() {
    this.categoryId = +this.activatedrouter.snapshot.paramMap.get('categoryId');
    this.totalLevel = +this.activatedrouter.snapshot.paramMap.get('totalLevel');
    this.type = this.activatedrouter.snapshot.paramMap.get('type');
    this.categoryName = this.activatedrouter.snapshot.paramMap.get('categoryName');
    this.selectCategory();
    this.httpClientService.onHomePage=true;


  }
ngAfterViewInit() {
	
    
  }
  redirectToHowTo(){
    this.router.navigate(['howto/'+this.categoryId]);
  }
   loadQuiz(level) {
     
if(this.userData.userId==null || this.userData.userId===''){
		this.userName='Guest';
	}
	else {
		this.userName=this.userData.userId;
  }
  console.log(this.userCurrentLevel);
   //this.router.navigate(['quiz', this.userName, this.categoryId, level]);
  // this.router.navigate(['games', this.userName, this.categoryId, level, this.userCurrentLevel, this.totalLevel]);
   if(level <= this.userCurrentLevel || true){
      console.log(this.type);
       if(this.type=='quiz'){ 
        console.log('quiz');
        this.router.navigate(['quiz', this.userName, this.categoryId, level, this.userCurrentLevel, this.totalLevel]);}
    
       else if(this.type=='games'){
         console.log('games');
        this.router.navigate(['games', this.userName, this.categoryId, level, this.userCurrentLevel, this.totalLevel]);
       }
      }
    else {
    alert('level is locked ');
    }
      }
     
  private selectCategory() {
    console.log('oin show level');
    if(this.userData.userId==null || this.userData.userId===''){
		this.userName='Guest';
	}
	else {
		this.userName=this.userData.userId;
	}
    this.httpClientService.loadCategoryLevel(this.userName, this.categoryId).subscribe(userCategoryData => {
      this.userCurrentLevel = userCategoryData.level;      
      this.iscategoryvisible = false;
      this.level = Array(this.totalLevel);
      this.isLoaderVisible = false;
    });
  }
    



}

