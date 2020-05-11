import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';

import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { saveMe } from './saveMe.component';
@Component({
  selector: 'showCategory',
  templateUrl: '../html/showCategory.html',
  styleUrls: ['./quizzler.component.css']
})

export class ShowCategory implements OnInit, AfterViewInit{

  categories: Category;
  level = Array(0);
   userName: string;
categoryId: number;
iscategoryvisible = true;
userCurrentLevel: number;
isLoaderVisible=true;
@Input('type') type: string;
  constructor( 
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
	private userData:UserData,

  ) { }

  ngOnInit() {
	  //this.dialog.open(saveMe);
   console.log(this.type);

    this.httpClientService.loadCategory(this.type).subscribe(
     response => this.handleSuccessfulResponse(response),
    );


  }
ngAfterViewInit() {
	
    
  }
   loadQuiz(level) {
if(this.userData.userId==null || this.userData.userId===''){
		this.userName='Guest';
	}
	else {
		this.userName=this.userData.userId;
  }
  
	 //this.router.navigate(['quiz', this.userName, this.categoryId, level]);
     if(level <= this.userCurrentLevel){
       if(this.type=='quiz')
       this.router.navigate(['quiz', this.userName, this.categoryId, level]);
       else if(this.type=='games'){
        this.router.navigate(['games', this.userName, this.categoryId, level]);
       }
      }
    else {
    alert('level is locked ');
    }
      }
     
  private selectCategory(category: Category) {
    if(this.userData.userId==null || this.userData.userId===''){
		this.userName='Guest';
	}
	else {
		this.userName=this.userData.userId;
	}
    this.httpClientService.loadCategoryLevel(this.userName, category.categoryId).subscribe(userCategoryData => {
      this.userCurrentLevel = userCategoryData.level;
      this.categoryId = category.categoryId;
      this.iscategoryvisible = false;
      this.level = Array(category.level);
    });
  }
    handleSuccessfulResponse(response) {
    this.categories = response;
this.isLoaderVisible=false;
  }

loadData() {
    this.isLoaderVisible = true;
    setTimeout(() => {
      this.isLoaderVisible = false;
    }, 5000);
  }

}

