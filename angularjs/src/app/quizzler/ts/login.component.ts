import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClientService, User, UserData } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider,SocialUser } from 'angularx-social-login';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'LoginComponent',
  templateUrl: '../html/login.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;
 signin= false;
 signup= true;
 isChecked= true;
 ifOnFocus=false; 
flag=false; 
 socialUser: SocialUser;
 public errorMessage: String;
  constructor(
    public  router: Router ,
    public activateRoute: ActivatedRoute,
    public httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<LoginComponent>,
	private authService: AuthService,
	private userData:UserData,
  ) { }
signInWithFB(): void {
  console.log(FacebookLoginProvider.PROVIDER_ID);
	this.signWithSocial(FacebookLoginProvider.PROVIDER_ID);
  
}
signWithSocial(socialProviderId){
	 this.authService.signIn(socialProviderId).then(socialUser => {
		 
		
    console.log("mayank  response"+socialUser);
		  if(null != socialUser){

    console.log("poorwa"+this.socialUser);
	 localStorage.setItem('userId',socialUser.email);
   this.userData.createUserData( socialUser.email,socialUser.firstName,socialUser.lastName,socialUser.email,'','',0);
    
   this.httpClientService.updateUser( this.userData,'createOrGetUser').subscribe(response => {
		   this.userData.cloneUserData(response);
		   this.dialogRef.close(response);
	  });// if user is login again then need to find out what to do
  
		 
		  }
		 
		 
  },error=>{
    console.log("error");
  }
  );
}
signInWithGoogle(): void {
	
   this. signWithSocial(GoogleLoginProvider.PROVIDER_ID);
	
}
signOut(): void {
  this.authService.signOut();
}
  ngOnInit() {

	
    this.user = this.httpClientService.loadUser();
var elelist = document.getElementsByTagName("input");
for(var i = 0; i < elelist.length; i++){
    elelist[i].blur();
}
    if (localStorage.getItem('userId') != null) {
this.router.navigate(['' + localStorage.getItem('userId')]);
  }
}
  handlerError(message: String) {
    console.log(this.errorMessage);

  }
registerUser() {
  
  
  let self = this;
  this.user.username, this.user.password
  var httpClientService = this.httpClientService;
  var handlerError = this.handlerError;
  this.userData.createUserData(  this.user.username,'','','','',this.user.password,0);
  this.httpClientService.updateUser( this.userData,'registerUser').subscribe(response => {
    if(null==response){
      self.errorMessage = 'User Already Exists.';
    }
    else{
      self.userData.cloneUserData(response);
    self.dialogRef.close(response);
    self.login();
  }
 });

}

 login() {
  let self=this;
  this.userData.createUserData(  this.user.username,'','','','',this.user.password,0);
  this.httpClientService.updateUser( this.userData,'checkLogin').subscribe(response => {
    if(null==response){
      self.errorMessage = 'Invalid User id or password.';
    }
    else{
      localStorage.setItem('userId', response.userId);
      self.userData=response;
			self.dialogRef.close(self.userData);
  }
 });
          //router.navigate([returnUrl || '/showCategory/' + userData.Username]);        
}

focusFunction(){
	
	this.ifOnFocus=true;
	
	
}

focusOutFunction(){
	this.ifOnFocus=false;
}
skiplogin() {

  const userName = Math.random().toString(36).substring(7);
  const password = Math.random().toString(36).substring(2);
  this.user.username = userName;
  this.user.password = password;
  this.registerUser();

}
}
