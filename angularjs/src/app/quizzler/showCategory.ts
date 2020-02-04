import { Component, OnInit } from '@angular/core';
import { HttpClientService, User ,Category,UserCategoryData} from '../service/httpclient.service';
import { timer } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router,ActivatedRoute } from '@angular/router';
import {
  
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  ICognitoUserAttributeData,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

@Component({
  selector: 'etst',
  templateUrl: './showCategory.html',
  styleUrls: ['./quizzler.component.css']
})

export class ShowCategory implements OnInit {
  
  categories:Category;
   userName:string;

  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService:HttpClientService,
   
    
  ) { }

  ngOnInit() {
    this.userName=this.activatedrouter.snapshot.paramMap.get("userName");
    this.httpClientService.loadCategory().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
   
  }
   loadQuiz( categoryId){
     this.httpClientService.userCategoryData=new UserCategoryData(this.userName,categoryId,0);
    this.router.navigate(['quiz']);
  };
    handleSuccessfulResponse(response){
    this.categories=response;
  };

 
}


