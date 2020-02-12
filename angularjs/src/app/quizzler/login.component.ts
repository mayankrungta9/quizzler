import { Component, OnInit } from '@angular/core';
import { HttpClientService, User,UserData } from '../service/httpclient.service';
import { timer } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router } from '@angular/router';
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
 signin:boolean=true;
 signup:boolean=false;
 isChecked:boolean=true;
 public errorMessage:String;
  constructor(
    public  router: Router ,
    public httpClientService:HttpClientService,
    
  ) { }
 
  ngOnInit() {
    this.user=this.httpClientService.loadUser();
    
    if(localStorage.getItem('name')!=null)
   {
this.router.navigate(['/showCategory/'+localStorage.getItem('name')]);
  }
}
  handlerError(message:String){
    console.log(this.errorMessage);
    
  }
registerUser(){
  //localStorage.setItem("lastname", "Smith");
  var self=this;
  
 var httpClientService= this.httpClientService;
 var handlerError = this.handlerError;
  console.log("dsfd"+localStorage.getItem("lastname"));
    const poolData = {    
      UserPoolId : "us-east-1_S9YKJEdml", // Your user pool id here    
      ClientId : "3dtkjkgtbec6u9q6h6h2gduc3u" // Your client id here
      }; 
      const pool_region = 'us-east-1';
     const userPool = new CognitoUserPool(poolData);
    var attributeList = [];
    attributeList.push(new CognitoUserAttribute({Name:"name",Value:this.user.username}));
     var message =   userPool.signUp(this.user.username, this.user.password, attributeList, null, function(err, result){
        if (err) {
          self.errorMessage=err.message;
    
        }
        else {
          var userData= new UserData( result.user.getUsername(),"",""); 

          httpClientService.saveUser(userData).subscribe();
          self.login();
        }

       
   // cognitoUser = result.user;
        console.log('user name is ' + message );
        
    })
   
    
  
}

 login() {
  var router=this.router;
  

  const poolData = {    
    UserPoolId : "us-east-1_S9YKJEdml", // Your user pool id here    
    ClientId : "3dtkjkgtbec6u9q6h6h2gduc3u" // Your client id here
    }; 
    const pool_region = 'us-east-1';
   const userPool = new CognitoUserPool(poolData);
  var authenticationDetails = new AuthenticationDetails({
      Username : this.user.username,
      Password : this.user.password,
  });

  var userData = {
      Username : this.user.username,
      Pool : userPool
  };
  
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('id token + ' + result.getIdToken().getJwtToken());
          console.log('refresh token + ' + result.getRefreshToken().getToken());
        localStorage.setItem('name',userData.Username);
         router.navigate(['/showCategory/'+userData.Username]);
      },
      onFailure: function(err) {
          console.log(err);
      },
      

  });
}


skiplogin(){
  
  let userName = Math.random().toString(36).substring(7);
  let password = Math.random().toString(36).substring(2);
  this.user.username=userName;
  this.user.password=password;
  this.registerUser();
  
}
}

