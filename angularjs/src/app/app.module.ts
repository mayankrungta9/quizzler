import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quizzler/quizzler.component';
import { UserComponent } from './quizzler/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowCategory } from './quizzler/showCategory';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
        HeaderComponent,ShowCategory,
    FooterComponent,UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
