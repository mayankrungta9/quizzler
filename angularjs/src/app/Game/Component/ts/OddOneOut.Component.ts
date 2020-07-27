import { Component, OnInit,ViewChild,AfterViewInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService, CelebMemGameDto,CelebMemGameAndLevelDto, UserCategoryData, UserData} from '../../../service/httpclient.service';
import { MatDialog } from '@angular/material/dialog';
import { success } from '../../../quizzler/ts/success-component';
import { GameOver } from '../../../quizzler/ts/gameOver-component';
import { ButtonClickDirectiveDirective } from '../../../button-click-directive.directive';
import { LoginComponent } from '../../../quizzler/ts/login.component';
import { CategoryCompleted } from '../../../quizzler/ts/categoryCompleted';
@Component({
  selector: 'OddOneOut',
  templateUrl: '../html/OddOneOut.Component.html',
  styleUrls: ['../css/FindPairGame.css']
})

export class OddOneOut implements OnInit {
	 
	
	
	
constructor(       
   private httpClientService: HttpClientService,
	public  activatedrouter: ActivatedRoute ,
	public  router: Router ,
	private userData:UserData,
	private dialog: MatDialog,
  ) { }
 
ngOnInit() {

  
	}

	
}
