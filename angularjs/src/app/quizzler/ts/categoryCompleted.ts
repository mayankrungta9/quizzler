import { Component, inject, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
export const DIALOG_DATA = new InjectionToken('DIALOG_DATA');
@Component({
    selector: 'CategoryCompleted',
    templateUrl: '../html/CategoryCompleted.html',
    styleUrls: ['./login.component.css','./success.component.css']
  })
  export class CategoryCompleted  implements   OnInit{
     coins:string;
     gameOverImageBasePath="../../assets/images/gif/happy";
     imagePath="";
     totalImage:3;
    constructor(@Inject(MAT_DIALOG_DATA) data: any, public  router: Router  ) {
      
  this.coins = data;
    }
  
    ngOnInit() {
    
      var randomNumber=Math.floor(Math.random()*10)%3;
     this.imagePath=this.gameOverImageBasePath+randomNumber+".gif";
    
      }
      redirectToHome(){
        this.router.navigate(['home']);
      }
  }