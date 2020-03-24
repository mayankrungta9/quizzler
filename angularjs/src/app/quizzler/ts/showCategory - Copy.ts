import { Component, OnInit } from '@angular/core';
import { HttpClientService, Category} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';
import { success } from './success-component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';

@Component({
  selector: 'test',
  templateUrl: '../html/index.html',
  styleUrls: ['./quizzler.component.css']
})

export class ShowCategory implements OnInit {

  categories: Category;
  level = Array(0);
   userName: string;
categoryId: number;
iscategoryvisible = true;
userCurrentLevel: number;
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
	  //this.dialog.open(success,{
  //height: '50%',
  //width: '98%',
	//  });
    if (localStorage.getItem('name') != null) {
    this.userName = localStorage.getItem('name');
      } else {
        this.userName = 'Guest';
      }

    this.httpClientService.loadCategory().subscribe(
     response => this.handleSuccessfulResponse(response),
    );


  }

   loadQuiz(level) {
     if(level <= this.userCurrentLevel){
       this.router.navigate(['quiz', this.userName, this.categoryId, level]);
      }
    else {
    alert('level is locked');
    }
      }
     
  private selectCategory(category: Category) {
    console.log(category);
    this.httpClientService.loadCategoryLevel(this.userName, category.categoryId).subscribe(userCategoryData => {
      this.userCurrentLevel = userCategoryData.level;
      this.categoryId = category.categoryId;
      this.iscategoryvisible = false;
      this.level = Array(category.level);
    });
  }
    handleSuccessfulResponse(response) {
    this.categories = response;

  }



}

