import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app.error';
import { environment } from 'src/environments/environment';

export class User {
  username: string;
  password: string;
  phonenumber: string;
  email: string;
}

export class CelebMemGameDto{
	id:string;
	url:number;
	
}

export class CelebMemGameAndLevelDto{
  row:number;
  column:number;
  time:number;
  celebMemAndGameDto:CelebMemGameDto;
	
}
export class PathFinderDto{
  obstaclePosArray:number[];
  pathArray:number[];
  sourceUrl:string;
  targetUrl:string;
  obstacleUrl:string;
  row:number;
  column:number;
}

export class Category {
  categoryId: number;
  categoryName: string;
  url: string;
  level:number
  type:string
}

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
}
export class Quizes {
  constructor(
    public id: number,
    public description: string,
    public type: string,
    public option1: string,
    public option2: string,
    public option3: string,
    public option4: string,
    public url: string,
    public answer: string,
    public categoryId:number,
  ) { }
}
  

export class UserData {
	 public userId: string="";
    public first_name: string="";
    public last_name: string="";
  public coins:number=0;
  public email:string="";
  public phone:string="";
  public password:string="";
  constructor(
   
  ) { 
  
  }
  public createUserData(userId,first_name,last_name,email,phone,password,coins){
	  this.userId=userId;
	  this.first_name=first_name;
	  this.last_name=last_name;
    this.coins=coins;
    this.email=email;
    this.password=password;
    this.phone=phone;
  }
  
   public cloneUserData(response){
	  this.userId=response.userId;
	  this.first_name=response.first_name;
	  this.last_name=response.last_name;
    this.coins=response.coins;
    this.email=response.email;
    this.password=response.password;
    this.phone=response.phone;
  }
}



export class UserCoins {
  constructor(
    public userId: string,
    public coins: number,
    
	
  ) { }
}

export class LiveQuizPoints {
  constructor(
    public userId: string,
	public quizId:number,
    public points: number,
    
	
  ) { }
}

export class UserCategoryData {
	
  constructor(
    public userId: string,
    public categoryId: number,
    public level: number,

  ) { }
}

export class QuestionReported {
  constructor(
    public qid: number,
    public comments: string,


  ) { }
}

let selectedAnswerMap = new Map<Number, Number>();
export class SelectedAnswer {
  constructor(
    public quizId: Number[],
    public answer: Number[],
  ) { }
}
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  onHomePage=true;
  type="quiz";
  liveQuizCoins=0;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  baseServicePath: string =environment.baseUrl;
  level=0;
  userCategoryData: UserCategoryData;
  constructor(
    private httpClient: HttpClient
  ) {
  }

  loadQuizes(userCategoryData: UserCategoryData) {

    return this.httpClient.post<Quizes[]>(this.baseServicePath + 'all', userCategoryData, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }
  
  loadLiveQuizes(id: number) {

    return this.httpClient.get<Quizes[]>(this.baseServicePath + 'getLiveQuiz/'+id).pipe(

      catchError(this.handleError)
    );
  }

  loadPathFinderData(level: number) {

    return this.httpClient.get<PathFinderDto[]>(this.baseServicePath + 'getPathFinderGameData/'+level).pipe(

      catchError(this.handleError)
    );
  }
  loadCategoryLevel(userName: string, categoryId: number) {
this.loadAds("loadAd1").subscribe();
    return this.httpClient.post<UserCategoryData>(this.baseServicePath + 'getCategoryLevel/' + userName + '/' + categoryId, null, this.httpOptions).pipe(

      catchError(this.handleError)
    );

  }

  loadAds(url:string) {

    return this.httpClient.get<PathFinderDto[]>(this.baseServicePath +url).pipe(

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
  updateUser(user: UserData,action:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.httpClient.post<UserData>(this.baseServicePath +action, user, httpOptions).pipe(

      catchError(this.handleError)
    );

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
  
  
  saveUserCategoryLevel(userCategoryData: UserCategoryData) {


    return this.httpClient.post<User>(this.baseServicePath + 'saveUserCategoryLevel', userCategoryData, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }


     
  reportQuestion(qid: number, comments: string) {
    var questionreported = new QuestionReported(qid, comments) ;
  
    return this.httpClient.post<QuestionReported>(this.baseServicePath + 'reportQuestion', questionreported, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }
   
  loadCategory(type:string) { 
console.log(this.baseServicePath ); 
    return this.httpClient.get<Category[]>(this.baseServicePath + 'getCategory/'+type).pipe(

      catchError(this.handleError)
    );
  }
   loadGame(size) {

    return this.httpClient.get<CelebMemGameDto[]>(this.baseServicePath + 'getCelebGameImage/'+size).pipe(

      catchError(this.handleError)
    );
  }
   loadLiveQuizCategory() {
console.log(this.baseServicePath ); 
    return this.httpClient.get<LiveQuizCategory[]>(this.baseServicePath + 'getActiveLiveQuiz').pipe(

      catchError(this.handleError)
    );
  }
  
  loadUserData(userId:string) {

    return this.httpClient.get<UserData>(this.baseServicePath + 'getUserData/'+userId).pipe(

      catchError(this.handleError)
    );
  }
  loadUser() {


    return new User();
  }

  public onSelectAnswer(id: Number, option: Number) {
    selectedAnswerMap.set(id, option);

  }


  public submitAnswer() {
    // 
    var quid: Number[] = new Array(selectedAnswerMap.size);
    var answer: Number[] = new Array(selectedAnswerMap.size);
    var counter: number = 0;
    selectedAnswerMap.forEach((value: Number, key: Number) => {
      quid[counter] = key;
      answer[counter] = value;
      counter++;
    });
    var selectedAnswerArray: SelectedAnswer = new SelectedAnswer(quid, answer);
    console.log(selectedAnswerArray);
    return this.httpClient.post<Quizes[]>('http://localhost:8080/quiz/getResult', selectedAnswerArray).pipe(

      catchError(this.handleError)
    );

  }
}