import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';
import {

} from 'amazon-cognito-identity-js';


@Component({
  selector: 'profilePage',
  templateUrl: '../html/profilePage.html',
  styleUrls: ['./profilePage.css']
})

export class profilePage implements OnInit, AfterViewInit{

 
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    
	private userData:UserData,

  ) { }

  ngOnInit() {
	 

   console.log('test');

  }
ngAfterViewInit() {
	
    
  }
   
  }


