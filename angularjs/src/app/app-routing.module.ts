import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './quizzler/ts/login.component';
import { HomeComponent } from './Home/Component/ts/Home.Component';
import { liveQuizModule } from './liveQuiz/liveQuiz.module';

import { GameOver } from './quizzler/ts/gameOver-component';

import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';

import { ShowCategory } from './quizzler/ts/showCategory';
import { success, DIALOG_DATA } from './quizzler/ts/success-component';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { profilePage } from './quizzler/ts/profilePage';
import { ShowLevel } from './quizzler/ts/showLevel';
import { howto } from './quizzler/ts/howto.component';
import { privacy } from './quizzler/ts/privacy';
import { OddOneOut } from './Game/Component/ts/OddOneOut.Component';

const routes: Routes = [

  { path:'login', component: LoginComponent},
  { path:'', component: HomeComponent},
  { path:'home', component: HomeComponent},
   { path:'home/test', component: ShowCategory},
  { path:'quiz/:userName/:categoryId/:level/:currentUnlockedLevel/:totalLevel', component: QuizComponent},
  { path:'showCategory/:userName', component: ShowCategory},
  { path:'success', component: success},
  { path:'GameOver', component: GameOver},
  { path:'crossword', component: CrosswordComponent},
  { path:'catchHero', component: CatchHeroComponent},
  { path:'catchHero', component: CatchHeroComponent},
  { path:'profile', component: profilePage},
  { path:'howto/:categoryId', component: howto},
  {path:'showLevel/:categoryId/:totalLevel/:type/:categoryName',component:ShowLevel},
  {path:'privacy',component:privacy},
  { path:'games/OddOneOut', component: OddOneOut},
 // { path:'games/:userName/:categoryId/:level', loadChildren: () => import('./Game/Game.module').then(m => m.GameModule) },
  //{ path:'games/:userName/:categoryId/:level', loadChildren:  './Game/Game.module#GameModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 