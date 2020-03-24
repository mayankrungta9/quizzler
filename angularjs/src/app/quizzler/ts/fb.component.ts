
import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: '../html/fb.component.html',
  
})
export class fb implements OnInit{
  title = 'angular-fblogin';
  user: SocialUser;
loggedIn: boolean;
constructor(private authService: AuthService) { }
signInWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

signOut(): void {
  this.authService.signOut();
}
ngOnInit() {
  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    console.log(this.user);
  });
}
}
