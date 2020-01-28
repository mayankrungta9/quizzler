import { Component, OnInit } from '@angular/core';
import { HttpClientService, User } from '../service/httpclient.service';
import { timer } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  ICognitoUserAttributeData,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';




 
@Component({
  selector: 'etst',
  templateUrl: './login.html',
  styleUrls: ['./quizzler.component.css']
})

export class UserComponent implements OnInit {
  
  user:User;
 
  constructor(
    private httpClientService:HttpClientService
  ) { }

  ngOnInit() {
    this.user=this.httpClientService.loadUser();
    //this.Login();
  }
  
registerUser(){
  
    const poolData = {    
      UserPoolId : "us-east-1_S9YKJEdml", // Your user pool id here    
      ClientId : "3dtkjkgtbec6u9q6h6h2gduc3u" // Your client id here
      }; 
      const pool_region = 'us-east-1';
     const userPool = new CognitoUserPool(poolData);
    var attributeList = [];
    attributeList.push(new CognitoUserAttribute({Name:"name",Value:this.user.username}));
        userPool.signUp(this.user.username, this.user.password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
   // cognitoUser = result.user;
        console.log('user name is ' + result.user.getUsername());
        
    });

}

 Login() {
  const poolData = {    
    UserPoolId : "us-east-1_S9YKJEdml", // Your user pool id here    
    ClientId : "3dtkjkgtbec6u9q6h6h2gduc3u" // Your client id here
    }; 
    const pool_region = 'us-east-1';
   const userPool = new CognitoUserPool(poolData);
  var authenticationDetails = new AuthenticationDetails({
      Username : 'mayank',
      Password : 'mayank123',
  });

  var userData = {
      Username : 'mayank',
      Pool : userPool
  };
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('id token + ' + result.getIdToken().getJwtToken());
          console.log('refresh token + ' + result.getRefreshToken().getToken());
      },
      onFailure: function(err) {
          console.log(err);
      },

  });
}
}

