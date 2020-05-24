
import { Component, inject, Inject, InjectionToken, OnInit } from '@angular/core';
export const DIALOG_DATA = new InjectionToken('DIALOG_DATA');
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'sdasdapp-employeefdfdsf',
    templateUrl: '../html/GameOver.Component.html',
	styleUrls: ['./login.component.css','./success.component.css']
      })
  export class GameOver  implements   OnInit{
     coins:string;
     gameOverImageBasePath="../../assets/images/gif/sad";
     imagePath="";
     totalImage:3;
    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
  this.coins = data;
  }
  ngOnInit() {
    
  var randomNumber=Math.floor(Math.random()*10)%3;
 this.imagePath=this.gameOverImageBasePath+randomNumber+".gif";

  }
}   	