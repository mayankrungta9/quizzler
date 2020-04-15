import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app.error';
import { environment } from 'src/environments/environment';
import {  Quizes, UserData } from './httpclient.service';


export class LiveQuizCategory{
	id: number;
  quizName: string;
  type: number;
  entryfee:number;
   winningAmt: number;
  winningType:number;
  start_date:Date;
  end_date:Date;
  status:number;
  totalUsersPlayed:number;
}

export class LiveQuizPoints {
  constructor(
    public userId: string,
	public quizId:number,
    public points: number,
    
	
  ) { }
}

export class PrizeRankBoard {
  constructor(
    public prizeMoney: number,
	public start_rank:number,
    public end_rank: number,
    
	
  ) { }
}



@Injectable({
  providedIn: 'root'
})
export class LiveQuizService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  baseServicePath: string =environment.baseUrl;
 
  constructor(
    private httpClient: HttpClient
  ) {
  }

  
  
  loadLiveQuizes(id: number) {

    return this.httpClient.get<Quizes[]>(this.baseServicePath + 'getLiveQuiz/'+id).pipe(

      catchError(this.handleError)
    );
  }
  
   loadPrizeMatrix(id: number) {

    return this.httpClient.get<PrizeRankBoard[]>(this.baseServicePath + 'getRankDistribution/'+id).pipe(

      catchError(this.handleError)
    );
  }
  
   loadLiveQuizLeaderBoard(id: number) {

    return this.httpClient.get<LiveQuizPoints[]>(this.baseServicePath + 'getLiveQuizLeaderBoard/'+id).pipe(

      catchError(this.handleError)
    );
  }
  private handleError(error: Response) {

    if (error.status == 400) {
      console.log('Something went wrong');
      return throwError(new AppError(error));
    }

    else {
		 console.log(error);
      throw error;
  }
  }
 
  
  saveLiveQuizPoints(liveQuizPoints: LiveQuizPoints) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.httpClient.post<UserData>(this.baseServicePath + 'saveliveQuizPoints', liveQuizPoints, httpOptions).pipe(

      catchError(this.handleError)
    );

  }
  
  
 
   
 
   loadLiveQuizCategory() {
console.log(this.baseServicePath ); 
    return this.httpClient.get<LiveQuizCategory[]>(this.baseServicePath + 'getActiveLiveQuiz').pipe(

      catchError(this.handleError)
    );
  }
  
 
  
 
}