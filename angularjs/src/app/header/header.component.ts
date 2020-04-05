import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClientService,UserData } from '../service/httpclient.service';

import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../quizzler/ts/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent  {
 
  isloggedIn=false;
  constructor(
    public  router: Router ,
	 private dialog: MatDialog,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService:HttpClientService,
	private userData:UserData,
	
  ) { }
  ngOnInit() {
   console.log(this.userData);
    this.userData.userId=localStorage.getItem("userId");

	//console.log( this.userData.userId);
    if(this.userData.userId==null || this.userData.userId===''){
     
	this.isloggedIn=false;
     }
	 else {
		 this.isloggedIn=true;
		this.setUserData()
	 }
    
	
	
   
  }
  setUserData(){
	   this.httpClientService.loadUserData(this.userData.userId).subscribe(response=>{
		   this.userData.cloneUserData(response);

	console.log(this.userData);
	}
	);
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
  login(){
	  this.openLoginDialog();
	 
  } 

 logout(){
  
 this.isloggedIn=false;
 this.userData.createUserData( '','','',0);
    localStorage.removeItem("userId");
	
	this.userData.coins=0;
    this.router.navigate(['']);
  }
}
