import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLiveQuizes } from './Component/ts/ShowLiveQuizes.Component';
import { Ranking } from './Component/ts/Ranking.Component';
const routes: Routes = [

 
  { path:'showCategory', component: ShowLiveQuizes},
  { path:'showRanking/:quizId/:categoryId', component: Ranking}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveQuizRoutingModule { }
 