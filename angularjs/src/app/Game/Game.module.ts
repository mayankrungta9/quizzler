
import { NgModule, ErrorHandler, Injectable } from '@angular/core';


import { HttpClientService, LiveQuizCategory,UserData} from '../service/httpclient.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { GameComponent } from './Component/ts/Game.Component';
import { GameRoutingModule } from './Game-routing.module';

@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [ 
  GameComponent
  ],
  
  imports: [
    GameRoutingModule,MatProgressSpinnerModule,CommonModule,
  ],
  
  exports:[GameComponent]
})
export class GameModule {}