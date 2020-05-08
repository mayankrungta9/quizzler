import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[buttonClickSound]'
})
export class ButtonClickDirectiveDirective  implements OnInit{
   audio = new Audio();
  constructor() { }
  ngOnInit() {
    
      //this.audio.src = "./assets/audio/click.mp3";
      //this.audio.load();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
   //// this.audio.play();
    console.log('Click from Host Element!');
  }
}