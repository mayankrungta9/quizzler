
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientService,UserData } from './service/httpclient.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './quizzler/ts/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule} from '@angular/material/card'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './Home/Component/ts/Home.Component';

import { MatDialogModule } from '@angular/material/dialog';


import { APP_INITIALIZER } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success, DIALOG_DATA } from './quizzler/ts/success-component';

import { GameOver } from './quizzler/ts/gameOver-component';
import {saveMe} from './quizzler/ts/saveMe.component';
import { ButtonControlDirective } from './button-control.directive';
import { reportQues } from './quizzler/ts/reportQues.component';
import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserModule } from '@angular/platform-browser';

import { liveQuizModule } from './liveQuiz/liveQuiz.module';
import { GameModule } from './Game/Game.module';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl: string;
  constructor() { }
}
function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('./assets/config.json')
         .pipe(
           map((x: ConfigService) => {
             config.baseUrl = x.baseUrl;
             console.log(config.baseUrl);
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false);
             }
             config.baseUrl = 'http://localhost:8080/api';
             resolve(true);
             return of({});
           })
         ).subscribe();
    });
  };
}
@NgModule({
  declarations: [ 
    AppComponent,
    
        HeaderComponent,HomeComponent,
    FooterComponent,LoginComponent,saveMe,success,ShowCategory,GameOver,CatchHeroComponent,CrosswordComponent,QuizComponent
  ],
  entryComponents:[
    
  ],
  imports: [
    MatProgressSpinnerModule,BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,MatDialogModule,MatCardModule,liveQuizModule,GameModule
  ],
  providers: [UserData,
   
	 
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    },
	
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


