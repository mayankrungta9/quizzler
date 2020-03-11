import { Component, OnInit } from '@angular/core';
import { HttpClientService,Category} from '../../service/httpclient.service';

import { Router,ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';
import { saveMe } from './saveMe.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'test',
  templateUrl: '../html/showCategory.html',
  styleUrls: ['./quizzler.component.css']
})

export class ShowCategory implements OnInit {
  
  categories:Category;
  level=Array(0);
   userName:string;
categoryId:number;
iscategoryvisible = true;
userCurrentLevel:number;
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService:HttpClientService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit() {
    this.dialog.open(saveMe);
    this.userName=this.activatedrouter.snapshot.paramMap.get("userName");
    this.httpClientService.loadCategory().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );

   
  }
  openSaveMeDialog() {
    this.dialog.open(saveMe).afterClosed().subscribe(response => {
   
    });
  }
   loadQuiz(level){
    this.router.navigate(['quiz', this.userName,this.categoryId,level]);
      }
  private selectCategory(category:Category){
    console.log(category);
    this.httpClientService.loadCategoryLevel(this.userName,category.categoryId).subscribe(userCategoryData=>{
      this.userCurrentLevel=userCategoryData.level;
      this.categoryId=category.categoryId;
      this.iscategoryvisible=false;
      this.level = Array(category.level);
    });
  }
    handleSuccessfulResponse(response){
    this.categories=response;
    
  };


  
}

