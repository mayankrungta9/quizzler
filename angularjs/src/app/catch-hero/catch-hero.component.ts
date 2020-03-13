import { Component, OnInit } from '@angular/core';
import { Quizes } from "../service/httpclient.service";

@Component({
  selector: 'app-catch-hero',
  templateUrl: './catch-hero.component.html',
  styleUrls: ['./catch-hero.component.css']
})
export class CatchHeroComponent implements OnInit {
  constructor() { }
  
  prepareOption(quiz: Quizes ): object[] {
 
    var imageObject = [
      {thumbImage: quiz.option1,},
       {thumbImage: quiz.option2,},
       {thumbImage: quiz.option3,},
        {thumbImage: quiz.option4,},
    ];

    return imageObject;
  }

  ngOnInit() {
  }
  
}
