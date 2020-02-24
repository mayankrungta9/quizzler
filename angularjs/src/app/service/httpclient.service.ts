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

export class Category {
  categoryId: string;
  categoryName: string;
  url: string;

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
    public answer: number,
  ) { }
}

export class UserData {
  constructor(
    public user_id: string,
    public first_name: string,
    public last_name: string,

  ) { }
}

export class UserCategoryData {
  constructor(
    public userId: string,
    public categoryId: number,
    public level: number,

  ) { }
}
export class UserCoins {
  constructor(
    public userId: string,
    public coins: number,


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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  baseServicePath: string =environment.baseUrl;
  
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
  loadCategoryLevel(userName: string, categoryId: number) {

    return this.httpClient.post<UserCategoryData>(this.baseServicePath + 'getCategoryLevel/' + userName + '/' + categoryId, null, this.httpOptions).pipe(

      catchError(this.handleError)
    );

  }
  private handleError(error: Response) {

    if (error.status == 400) {
      console.log('Something went wrong');
      return throwError(new AppError(error));
    }

    else {
      throw error;
  }
  }
  saveUser(user: UserData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.httpClient.post<User>(this.baseServicePath + 'saveUser', user, httpOptions).pipe(

      catchError(this.handleError)
    );

  }

  saveUserCategoryLevel(userCategoryData: UserCategoryData) {


    return this.httpClient.post<User>(this.baseServicePath + 'saveUserCategoryLevel', userCategoryData, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }

  saveUserCoins(userName: string, coins: number) {
    var usercoins = new UserCoins(userName, coins);
    console.log(usercoins);
    return this.httpClient.post<User>(this.baseServicePath + 'saveUserCoins', usercoins, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }
  reportQuestion(qid: number, comments: string) {
    var questionreported = new QuestionReported(qid, comments);
  
    return this.httpClient.post<QuestionReported>(this.baseServicePath + 'reportQuestion', questionreported, this.httpOptions).pipe(

      catchError(this.handleError)
    );
  }
  getUserCoins(userName: string) {
  
    
    return this.httpClient.get<UserCoins>(this.baseServicePath + 'getUserCoins/'+userName).pipe(

      catchError(this.handleError)
    );
  }
  loadCategory() {

    return this.httpClient.get<Category[]>(this.baseServicePath + 'getCategory').pipe(

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