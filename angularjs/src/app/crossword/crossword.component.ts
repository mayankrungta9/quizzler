import { Component, OnInit } from '@angular/core';
export class Crossword {
  constructor(
    
    public qid: number,
    public description: string,
    public position: number,
    public direction: string,
    public answer: string,
    
  ) { }
}
@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})
export class CrosswordComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    var crossword1 = new Crossword(1,'som erandom text',1,'D','12345');
    var crossword2 = new Crossword(2,'som erandom text',1,'R','67890');
    var crossword3 = new Crossword(3,'som erandom text',8,'D','12345');
    var crossword4 = new Crossword(4,'som erandom text',5,'D','mayank');
    var crossword5 = new Crossword(5,'som erandom text',3,'D','12345');
    var crosswordarray =[crossword1,crossword2,crossword3,crossword4,crossword5];
  }

}

