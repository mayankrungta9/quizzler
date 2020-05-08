import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'GameComponent',
  templateUrl: './Game.Component.html',
  //styleUrls: ['../css/Game.css']
})

export class GameComponent implements OnInit, AfterViewInit {
	 
  categoryId:number;
  level:number;
	 
constructor(       
   
  
  public activatedrouter: ActivatedRoute,
  ) { }
ngOnInit() {
  this.categoryId = +this.activatedrouter.snapshot.paramMap.get('categoryId');
  console.log(this.categoryId);
  this.level = +this.activatedrouter.snapshot.paramMap.get('level');
	}
	ngAfterViewInit(){

	}
 
}

