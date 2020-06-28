import { Component, OnInit,AfterViewInit,Input } from '@angular/core';
import { HttpClientService, Category,UserData} from '../../service/httpclient.service';

import { Router, ActivatedRoute } from '@angular/router';

import {Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';

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
    private _location: Location,
    private dialog: MatDialog,
	private userData:UserData,

  ) { }
isLoggedIn:boolean=true;
  ngOnInit() {
    console.log(this.userData)
    if(this.userData.userId==null || this.userData.userId==''){
      this.isLoggedIn=false;
    }

  }
ngAfterViewInit() {
	setTimeout(()=>{
    
    this.user.cloneUserData(this.userData) 
    
    
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
}
openLoginDialog() {
  if(!this.isLoggedIn){
  this.dialog.open(LoginComponent,{
  height: '75%',
  width: '95%',
  disableClose: true,
	  }).afterClosed().subscribe(response => {
    if (response != null) {
      this.userData.cloneUserData(response);
      this.user.cloneUserData(this.userData);
   this.isLoggedIn=true;
   this.back();
    } else {
      console.log("sorry wrong credential");
    }
  });

}
else{
  localStorage.removeItem("userId");
  this.userData.userId=null;
  this.isLoggedIn=false;
  this.user=new UserData();
  this.userData.cloneUserData(this.user);
  this.back();
  console.log(this.userData+"after logout")

}
}
  }


