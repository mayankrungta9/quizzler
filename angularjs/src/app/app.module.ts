import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { LoginComponent } from './quizzler/ts/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success, DIALOG_DATA } from './quizzler/ts/success-component';
import { GameOver } from './quizzler/ts/gameOver-component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {saveMe} from './quizzler/ts/saveMe.component';
import { ButtonControlDirective } from './button-control.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
        HeaderComponent,ShowCategory,
    FooterComponent,LoginComponent,success,GameOver,saveMe, ButtonControlDirective
  ],
  entryComponents:[
    saveMe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,NoopAnimationsModule,MatDialogModule
  ],
  providers: [
    {provide:DIALOG_DATA,useValue:{ }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
