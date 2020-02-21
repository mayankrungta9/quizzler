import { Component, OnInit } from '@angular/core';
import { HttpClientService,Category} from '../../service/httpclient.service';

import { Router,ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';

@Component({
  selector: 'test',
  templateUrl: '../html/showCategory.html',
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
    this.httpClientService.loadCategoryLevel(this.userName,categoryId).subscribe(userCategoryData=>{
    this.router.navigate(['quiz', this.userName,categoryId,userCategoryData.level]);
    });
  };
    handleSuccessfulResponse(response){
    this.categories=response;
  };


 
 
}

