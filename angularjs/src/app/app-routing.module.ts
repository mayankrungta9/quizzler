import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { LoginComponent } from './quizzler/ts/login.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success } from './quizzler/ts/success-component';
import { GameOver } from './quizzler/ts/gameOver-component';
import { AuthGuard } from './service/auth-guard.service';
const routes: Routes = [

  
  { path:'', component: LoginComponent},
  { path:'quiz/:userName/:categoryId/:level', component: QuizComponent},
  { path:'showCategory/:userName', component: ShowCategory,canActivate:[AuthGuard]},
  { path:'success', component: success},
  { path:'GameOver', component: GameOver},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
