import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
export class User{
  username:string;
  password:string;
  phonenumber:string; 
  email:string;
}

export class Category{
  categoryId:string;
  categoryName:string;
  url:string; 
  
}
export class Quizes{
  constructor(
    public id:Number,
    public description:string,
    public type:string,
    public option1:string,
    public option2:string,
    public option3:string,
    public option4:string,
    public url:string,
    public answer:number,
  ) {}
}

export class UserData{
  constructor(
    public user_id:string,
    public first_name:string,
    public last_name:string,
    
  ) {}
}

export class UserCategoryData{
  constructor(
    public userId:string,
    public categoryId:Number,
    public level:Number,
    
  ) {}
}

let selectedAnswerMap =  new Map<Number, Number>();
export class SelectedAnswer{
  constructor(
    public quizId:Number[],   
    public answer:Number[],
  ) {}
}
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  userCategoryData:UserCategoryData;
  constructor(
    private httpClient:HttpClient
  ) { 
     }

     loadQuizes(userCategoryData:UserCategoryData)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    return this.httpClient.post<Quizes[]>('http://localhost:8080/quiz/all',userCategoryData,httpOptions);
  }

  saveUser (user: UserData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    return this.httpClient.post<User>('http://localhost:8080/quiz/saveUser', user, httpOptions);
      
  }

  loadCategory()
  {
    
    return this.httpClient.get<Category[]>('http://localhost:8080/quiz/getCategory');
  }
  loadUser()
  {
    
   
    return new User();
  }

  public onSelectAnswer(id:Number,option:Number) {
    selectedAnswerMap.set(id,option);
    
  }


  public submitAnswer() {
   // 
   var quid:Number[]= new Array(selectedAnswerMap.size)  ;
   var answer:Number[]=new Array(selectedAnswerMap.size); 
    var counter:number=0;
    selectedAnswerMap.forEach((value: Number, key: Number) => {
      quid[counter] = key;
      answer[counter] = value;
      counter++;
  });
  var selectedAnswerArray:SelectedAnswer = new SelectedAnswer(quid,answer); 
  console.log(selectedAnswerArray);
  return this.httpClient.post<Quizes[]>('http://localhost:8080/quiz/getResult',selectedAnswerArray);
   
  }
}