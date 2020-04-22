import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './quizzler/ts/login.component';
import { HomeComponent } from './Home/Component/ts/Home.Component';
import { liveQuizModule } from './liveQuiz/liveQuiz.module';

import { GameOver } from './quizzler/ts/gameOver-component';
import {saveMe} from './quizzler/ts/saveMe.component';
import { ButtonControlDirective } from './button-control.directive';
import { reportQues } from './quizzler/ts/reportQues.component';
import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success, DIALOG_DATA } from './quizzler/ts/success-component';
import { QuizComponent } from './quizzler/ts/quizzler.component';

const routes: Routes = [

  { path:'login', component: LoginComponent},
  { path:'', component: HomeComponent},
   { path:'home/test', component: ShowCategory},
  { path:'quiz/:userName/:categoryId/:level', component: QuizComponent},
  { path:'showCategory/:userName', component: ShowCategory},
  { path:'success', component: success},
  { path:'GameOver', component: GameOver},
  { path:'crossword', component: CrosswordComponent},
  { path:'catchHero', component: CatchHeroComponent},
  { path:'catchHero', component: CatchHeroComponent},
 // { path:'showLiveQuizes', loadChildren:'./liveQuiz/liveQuiz.module#liveQuizModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 