import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClientService, User, UserData } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
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

 public errorMessage: String;
  constructor(
    public  router: Router ,
    public activateRoute: ActivatedRoute,
    public httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
    this.user = this.httpClientService.loadUser();
var elelist = document.getElementsByTagName("input");
for(var i = 0; i < elelist.length; i++){
    elelist[i].blur();
}
    if (localStorage.getItem('name') != null) {
this.router.navigate(['/showCategory/' + localStorage.getItem('name')]);
  }
}
  handlerError(message: String) {
    console.log(this.errorMessage);

  }
registerUser() {
  // localStorage.setItem("lastname", "Smith");
  alert('hello');
  let self = this;

  var httpClientService = this.httpClientService;
  var handlerError = this.handlerError;
  console.log('dsfd'+ localStorage.getItem('lastname'));
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
          self.errorMessage = err.message;

        } else {
          let userData = new UserData( result.user.getUsername(),'','');

          httpClientService.saveUser(userData).subscribe();
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
          localStorage.setItem('name', userData.Username);
         // let returnUrl = activateRoute.snapshot.queryParamMap.get('returnUrl');

          //router.navigate([returnUrl || '/showCategory/' + userData.Username]);
          self.dialogRef.close(userData.Username);
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

