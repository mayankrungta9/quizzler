import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientService,UserData } from './service/httpclient.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quizzler/ts/quizzler.component';
import { LoginComponent } from './quizzler/ts/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule} from '@angular/material/card'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShowCategory } from './quizzler/ts/showCategory';
import { success, DIALOG_DATA } from './quizzler/ts/success-component';
import { GameOver } from './quizzler/ts/gameOver-component';

import { MatDialogModule } from '@angular/material/dialog';
import {saveMe} from './quizzler/ts/saveMe.component';
import { ButtonControlDirective } from './button-control.directive';
import { reportQues } from './quizzler/ts/reportQues.component';
import { APP_INITIALIZER } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';
import { CrosswordComponent } from './crossword/crossword.component';
import { CatchHeroComponent } from './catch-hero/catch-hero.component';
import { NgImageSliderModule } from 'ng-image-slider';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    QuizComponent,
        HeaderComponent,ShowCategory,
    FooterComponent,LoginComponent,success,GameOver,saveMe,reportQues , ButtonControlDirective, CrosswordComponent, CatchHeroComponent,
  ],
  entryComponents:[
    saveMe,reportQues
  ],
  imports: [
    BrowserModule,MatProgressSpinnerModule,BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,MatDialogModule,NgImageSliderModule,MatCardModule
  ],
  providers: [UserData,
    {provide:DIALOG_DATA,useValue:{ }},
	 
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


