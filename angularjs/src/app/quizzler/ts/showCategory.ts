import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';

import { MatDialog } from '@angular/material/dialog';

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
   
    this.httpClientService.loadCategory(this.type).subscribe(
     response => this.handleSuccessfulResponse(response),
    );


  }
ngAfterViewInit() {
	
    
  }
 
     
  private selectCategory(category: Category) {
    this.router.navigate(['showLevel',  category.categoryId, category.level,this.type,category.categoryName]);
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

