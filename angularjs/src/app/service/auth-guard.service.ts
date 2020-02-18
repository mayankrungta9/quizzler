import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route,state:RouterStateSnapshot) {
    if(localStorage.getItem("name")!=null)
    return true;

    else this.router.navigate(['/'],{queryParams:{returnUrl:state.url}})
  }

  constructor(private router:Router

    ) { }
}
