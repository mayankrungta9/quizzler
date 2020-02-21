import { Component, inject, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export const DIALOG_DATA = new InjectionToken('DIALOG_DATA');
@Component({
    selector: 'Success-component',
    templateUrl: '../html/Success.Component.html',
    
  })
  export class success  {
     coins:string;
    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
  this.coins = data;
    }
  }