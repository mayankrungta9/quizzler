import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClientService, User, UserData } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider,SocialUser } from 'angularx-social-login';
import {

  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,

} from 'amazon-cognito-identity-js';
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
	this.signWithSocial(FacebookLoginProvider.PROVIDER_ID);
  
}
signWithSocial(socialProviderId){
	 this.authService.signIn(socialProviderId).then(socialUser => {
		 
		
		  
		  if(null != socialUser){
		this.socialUser = socialUser;
     
	 localStorage.setItem('userId',socialUser.email);
	 this.userData.createUserData( socialUser.email,socialUser.firstName,socialUser.lastName,0);
	  this.httpClientService.saveUser( this.userData).subscribe(response => {
		   this.userData.cloneUserData(response);
		   this.dialogRef.close(response);
	  });// if user is login again then need to find out what to do
    console.log(this.socialUser);
		 
		  }
		 
		 
  });
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
this.router.navigate(['/showCategory/' + localStorage.getItem('userId')]);
  }
}
  handlerError(message: String) {
    console.log(this.errorMessage);

  }
registerUser() {
  
  
  let self = this;

  var httpClientService = this.httpClientService;
  var handlerError = this.handlerError;
  
  const poolData = {
      UserPoolId : 'us-east-1_S9YKJEdml', // Your user pool id here
      ClientId : '3dtkjkgtbec6u9q6h6h2gduc3u' // Your client id here
      };
  const pool_region = 'us-east-1';
  const userPool = new CognitoUserPool(poolData);
  var attributeList = [];
  attributeList.push(new CognitoUserAttribute({Name:'name', Value: this.user.username}));
  var message =   userPool.signUp(this.user.username, this.user.password, attributeList, null, function(err, result) {
        if (err) {
			console.log(err);
          self.errorMessage = err.message;

        } else {
			
           self.userData.createUserData( result.user.getUsername(),'','',0);

          self.httpClientService.saveUser(self.userData).subscribe();
          self.login();
        }


   // cognitoUser = result.user;
        console.log('user name is ' + message );

    });



}

 login() {
  let self=this;
  let router = this.router;
  let activateRoute = this.activateRoute;

  const poolData = {
    UserPoolId : 'us-east-1_S9YKJEdml', // Your user pool id here
    ClientId : '3dtkjkgtbec6u9q6h6h2gduc3u' // Your client id here
    };
  const pool_region = 'us-east-1';
  const userPool = new CognitoUserPool(poolData);
  let authenticationDetails = new AuthenticationDetails({
      Username : this.user.username,
      Password : this.user.password,
  });

  let userData = {
      Username : this.user.username,
      Pool : userPool
  };

  let cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess (result) {
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('id token + ' + result.getIdToken().getJwtToken());
          console.log('refresh token + ' + result.getRefreshToken().getToken());
          
		   localStorage.setItem('userId', userData.Username);
         // let returnUrl = activateRoute.snapshot.queryParamMap.get('returnUrl');
		 self.userData.userId=userData.Username;
		self.httpClientService.saveUser(self.userData).subscribe(response=>{
			self.userData=response;
			self.dialogRef.close(self.userData);
		});

          //router.navigate([returnUrl || '/showCategory/' + userData.Username]);
          
      },
      onFailure(err) {
          console.log(err);
           self.errorMessage = err.message;
      },


  });
  
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

