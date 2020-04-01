
import { Component, inject, Inject, InjectionToken } from '@angular/core';
export const DIALOG_DATA = new InjectionToken('DIALOG_DATA');
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'sdasdapp-employeefdfdsf',
    templateUrl: '../html/GameOver.Component.html',
	styleUrls: ['./login.component.css','./success.component.css']
      })
  export class GameOver  {
     coins:string;
    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
  this.coins = data;
  }}   