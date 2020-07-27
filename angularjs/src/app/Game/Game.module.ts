
import { NgModule, ErrorHandler, Injectable } from '@angular/core';


import { HttpClientService, LiveQuizCategory,UserData} from '../service/httpclient.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { GameComponent } from './Game.Component';
import { GameRoutingModule } from './Game-routing.module';
import {FindPathGameComponent} from './Component/ts/FindPathGame.Component';
import {FindPairGameComponent} from './Component/ts/FindPairGame.Component';
import {OddOneOut} from './Component/ts/OddOneOut.Component';
@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [ 
    FindPathGameComponent,FindPairGameComponent,
    GameComponent,OddOneOut
  ],
  
  imports: [
    GameRoutingModule,MatProgressSpinnerModule,CommonModule,
  ],
  
  exports:[FindPathGameComponent,FindPairGameComponent,OddOneOut]
})
export class GameModule {}