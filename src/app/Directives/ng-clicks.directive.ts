import { Directive } from '@angular/core';


@Directive({
  selector: '[appNgClicks]'
})
export class NgClicksDirective {

  constructor( ) {}

  public LimpiarInformacion(){
    console.clear()
  }
}
