import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quizzler/quizzler.component';
import { LoginComponent } from './quizzler/login.component';
import { ShowCategory } from './quizzler/showCategory';
import { success } from './quizzler/success-component';
import { gameOver } from './quizzler/gameOver-component';
import { AuthGuard } from './service/auth-guard.service';
const routes: Routes = [

  
  { path:'', component: LoginComponent},
  { path:'quiz/:userName/:categoryId/:level', component: QuizComponent},
  { path:'showCategory/:userName', component: ShowCategory,canActivate:[AuthGuard]},
  { path:'success', component: success},
  { path:'gameOver', component: gameOver},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
