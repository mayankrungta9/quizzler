import { Component, OnInit,AfterViewInit } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';

import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { saveMe } from './saveMe.component';
@Component({
  selector: 'test',
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
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
	private userData:UserData,

  ) { }

  ngOnInit() {
	  //this.dialog.open(saveMe);
   

    this.httpClientService.loadCategory().subscribe(
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
     if(level <= this.userCurrentLevel){
       this.router.navigate(['quiz', this.userName, this.categoryId, level]);
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

