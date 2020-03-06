import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catch-hero',
  templateUrl: './catch-hero.component.html',
  styleUrls: ['./catch-hero.component.css']
})
export class CatchHeroComponent implements OnInit {
  imageObject: Array<object> = [{
    
    thumbImage: '/assets/images/sallu.jpg',
    
}, 
{
 
  thumbImage: '/assets/images/sallu.jpg',
  
}, 
{
 
  thumbImage: '/assets/images/sallu.jpg',
  
}, 
{
  
  thumbImage: '/assets/images/sallu.jpg',
  
}
];
  constructor() { }

  ngOnInit() {
  }
  imageClick(count) {
    console.log(count);
}
}
