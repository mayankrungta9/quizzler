import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quizzler/quizzler.component';
import { UserComponent } from './quizzler/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowCategory } from './quizzler/showCategory';
import { AppErrorHandler } from './common/app-errorHandler';
import { success } from './quizzler/success-component';
import { gameOver } from './quizzler/gameOver-component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
        HeaderComponent,ShowCategory,
    FooterComponent,UserComponent,success,gameOver
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
