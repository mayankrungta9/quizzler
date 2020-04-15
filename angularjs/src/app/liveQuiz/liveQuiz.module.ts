
import { NgModule, ErrorHandler, Injectable } from '@angular/core';

import { LiveQuizRoutingModule } from './liveQuiz-routing.module';
import { ShowLiveQuizes } from './Component/ts/ShowLiveQuizes.Component';
import { PrizeMatrix } from './Component/ts/PrizeMatrix.Component';
import { Ranking } from './Component/ts/Ranking.Component';
import { LeaderBoard } from './Component/ts/LeaderBoard.Component';
import { HttpClientService, LiveQuizCategory,UserData} from '../service/httpclient.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { currencyPipe } from '../common/currencyPipe';
@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [ 
   ShowLiveQuizes,PrizeMatrix,LeaderBoard,Ranking,currencyPipe
  ],
  
  imports: [
    LiveQuizRoutingModule,MatProgressSpinnerModule,CommonModule,
  ],
  
  
})
export class liveQuizModule {}