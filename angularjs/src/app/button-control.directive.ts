import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonControl]'
})
export class ButtonControlDirective {

  constructor() { }
  @HostListener('click') onClick(){
console.log('directive triger click');
}
}
