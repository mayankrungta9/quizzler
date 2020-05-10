
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientService,UserData } from './service/httpclient.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './quizzler/ts/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule} from '@angular/material/card'
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './Home/Component/ts/Home.Component';

import { MatDialogModule } from '@angular/material/dialog';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success,  } from './quizzler/ts/success-component';

import { GameOver } from './quizzler/ts/gameOver-component';
import {saveMe} from './quizzler/ts/saveMe.component';

import { reportQues } from './quizzler/ts/reportQues.component';
import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';


import { liveQuizModule } from './liveQuiz/liveQuiz.module';
import { TimeoutInterceptor, DEFAULT_TIMEOUT } from './service/TimeoutInterceptor';
import { GameModule } from './Game/Game.module';
import { ButtonClickDirectiveDirective } from './button-click-directive.directive';
import { profilePage } from './quizzler/ts/profilePage';

@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [ 
    AppComponent,reportQues,profilePage,
    
        HeaderComponent,HomeComponent,
    FooterComponent,LoginComponent,saveMe,success,ShowCategory,GameOver,CatchHeroComponent,CrosswordComponent,QuizComponent, ButtonClickDirectiveDirective
  ],
  entryComponents:[
    reportQues,saveMe
    
  ],
  imports: [
    MatProgressSpinnerModule,BrowserAnimationsModule, 
    AppRoutingModule,GameModule,
    HttpClientModule,
    FormsModule,MatDialogModule,MatCardModule,liveQuizModule
  ],
  providers: [UserData,
   
	 
    
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


