import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'KPipeCurrency'
})
export class currencyPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    
     

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }
else{
	return (input/1000)+"K";
}
    

    


  }

}