import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef, private rendered: Renderer2) { }

  //@hostListener Es una forma de llamar la directiva, para que la directiva este atento a la aplicacion
  @HostListener('blur') CapitalizarNombre() {

    const elemento: Array<string> = this.el.nativeElement.className;

    if (elemento.indexOf('is-valid') >= 0) return;

    let NombreDividido: Array<string> = this.el.nativeElement.value.split(' ');
    NombreDividido.forEach((valor, index) => {
      NombreDividido[index] = valor.substring(0, 1).toUpperCase() +
        valor.substring(1, valor.length).toLowerCase();
    })

    //join unirme todas las posiciones de un arreglo que se separo
    //Rendere2 Renderizar una cosa dentro de un elemento de angular
    this.rendered.setProperty(this.el.nativeElement, 'value', NombreDividido.join(' '));
  }
}
