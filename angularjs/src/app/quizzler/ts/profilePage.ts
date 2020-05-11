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

  user=new UserData();
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    
	private userData:UserData,

  ) { }

  ngOnInit() {
    

  }
ngAfterViewInit() {
	setTimeout(()=>{
    
    this.user.cloneUserData(this.userData)
    
    
  },2000);
  }
  updateUser(){
    this.httpClientService.updateUser(this.user,'updateUser').subscribe(response=>{
if(null!==response){
  this.userData.cloneUserData(this.user);
}
else{
  console.log('update failed')
}
    });
  }
  }


