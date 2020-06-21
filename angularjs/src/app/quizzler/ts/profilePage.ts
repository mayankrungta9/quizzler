import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';

import {Location} from '@angular/common';
import { LoginComponent } from './login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'profilePage',
  templateUrl: '../html/profilePage.html',
  styleUrls: ['./profilePage.css']
})

export class profilePage implements OnInit, AfterViewInit{

  user=new UserData();
  isloggedIn=false;
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService: HttpClientService,
    private _location: Location,
    private dialog: MatDialog,
	private userData:UserData,

  ) { }

  ngOnInit() {
    

  }
ngAfterViewInit() {
	setTimeout(()=>{
    
    this.user.cloneUserData(this.userData) 
    if(null != this.user.userId && "" != this.user.userId)
    {
      this.isloggedIn=true;
    }
    else {
      this.isloggedIn=false;
    }
  },2000);
  }
  cancelUpdate(){

    this.back();
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
    this.back();
  }
 back(){
  this._location.back();
} logout(){
  
  this.isloggedIn=false;
  this.userData.createUserData( '','','','','','',0);
     localStorage.removeItem("userId");
   
   this.userData.coins=0;
     this.router.navigate(['']);
   }
   login(){
     this.openLoginDialog();
    
   }
   openLoginDialog() {

    this.dialog.open(LoginComponent,{
    height: '75%',
    width: '95%',
      }).afterClosed().subscribe(response => {
      if (response != null) {
      console.log(response);
         this.userData.cloneUserData(response);
  this.isloggedIn=true; 
      } else {
        console.log("sorry wrong credential");
      }
    });
  }
  }


