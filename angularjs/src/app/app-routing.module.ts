import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quizzler/quizzler.component';
import { UserComponent } from './quizzler/login.component';
import { ShowCategory } from './quizzler/showCategory';
const routes: Routes = [

  
  { path:'', component: UserComponent},
  { path:'quiz', component: QuizComponent},
  { path:'showCategory', component: ShowCategory},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
