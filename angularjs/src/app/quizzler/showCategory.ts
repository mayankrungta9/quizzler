import { Component, OnInit } from '@angular/core';
import { HttpClientService, User ,Category} from '../service/httpclient.service';
import { timer } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router } from '@angular/router';
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
 

  constructor(
    public  router: Router ,
    private httpClientService:HttpClientService,
    
  ) { }

  ngOnInit() {
    this.httpClientService.loadCategory().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
   
  }
  handleSuccessfulResponse(response){
    this.categories=response;
  }

}


