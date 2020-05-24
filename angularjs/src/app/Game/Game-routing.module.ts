import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './Game.Component';

const routes: Routes = [

 
  { path:'games/:userName/:categoryId/:level/:currentUnlockedLevel:/:totalLevel', component: GameComponent},
  //{ path:'showLiveQuizes/showRanking/:quizId/:categoryId', component: Ranking}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
 