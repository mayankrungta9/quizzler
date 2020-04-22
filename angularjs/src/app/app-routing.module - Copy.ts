import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { LoginComponent } from './quizzler/ts/login.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success } from './quizzler/ts/success-component';
import { GameOver } from './quizzler/ts/gameOver-component';
import { AuthGuard } from './service/auth-guard.service';
import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';

const routes: Routes = [

  { path:'login', component: LoginComponent},
  { path:'', component: ShowCategory},
  { path:'home/test', component: ShowCategory},
  { path:'quiz/:userName/:categoryId/:level', component: QuizComponent},
  { path:'showCategory/:userName', component: ShowCategory},
  { path:'success', component: success},
  { path:'GameOver', component: GameOver},
  { path:'crossword', component: CrosswordComponent},
  { path:'catchHero', component: CatchHeroComponent},
  { path:'showLiveQuizes', loadChildren:'./liveQuiz/liveQuiz.module#liveQuizModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 