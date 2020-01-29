import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    public answer:string,
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

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     loadQuizes()
  {
    console.log("test call");
    return this.httpClient.get<Quizes[]>('http://localhost:8080/quiz/all');
  }

  loadCategory()
  {
    console.log("test call");
    return this.httpClient.get<Category[]>('http://localhost:8080/quiz/getCategory');
  }
  loadUser()
  {
    console.log("test call");
   
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