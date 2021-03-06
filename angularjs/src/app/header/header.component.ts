import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClientService,UserData } from '../service/httpclient.service';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

import { LoginComponent } from '../quizzler/ts/login.component';
import { CategoryCompleted } from '../quizzler/ts/categoryCompleted';
import { saveMe } from '../quizzler/ts/saveMe.component';
import { DOCUMENT } from '@angular/common';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { rateMe } from '../quizzler/ts/rateMe.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent  {
 
  isloggedIn=false;
  constructor(
    public  router: Router ,
    @Inject(DOCUMENT) private document: Document,
     public  activatedrouter: ActivatedRoute ,
     public httpClientService:HttpClientService,
   public userData:UserData,
   public authService: AuthService,
   private dialog: MatDialog,
  ) { }
  ngOnInit() {
   console.log(this.userData);
    this.userData.userId=localStorage.getItem("userId");

	//console.log( this.userData.userId);
    if(this.userData.userId==null || this.userData.userId===''){
     
  this.isloggedIn=false;
  this.userData.first_name="GUEST"
     }
	 else {
		 this.isloggedIn=true;
		this.setUserData()
	 }
    
	//this.openRateMeDialog();
	
   
  }
  openRateMeDialog() {
    
     this.dialog.open(rateMe,{ height: '30%',
     
     disableClose: true,
     width: '95%',
    
    }).afterClosed().subscribe(response => {
       if (response == 'yes') {
        window.location.href ="market://details?id=com.quizzler";
       } else {
         
        
       }
     });
     
   }

  setUserData(){
	   this.httpClientService.loadUserData(this.userData.userId).subscribe(response=>{
		   this.userData.cloneUserData(response);

	console.log(this.userData);
	}
	);
  }
  
  
  redirectToUserProfile(){
    this.router.navigate(['profile']);
    //this.document.location.href = 'https://play.google.com/store/apps/details?id=com.whatsapp';
  }
  redirectToHome(){
    this.router.navigate(['home']);
  }

}
