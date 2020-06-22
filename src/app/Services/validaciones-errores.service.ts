import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesErroresService {

  constructor() { }

  public ErrorMensage(errorRecibido: Object) {

    let message: string = "";

    if (errorRecibido == null) {
      return {
        error: false
      }
    }

    switch (true) {
      case errorRecibido.hasOwnProperty('required'):
        message = "Este necesario ingresar este campo";
        break;

      case errorRecibido.hasOwnProperty('alphaNumeric'):
        message = "Este campo tiene datos innecesarios";
        break;

      case errorRecibido.hasOwnProperty('minLength'):
        message = "Este campo no tiene los campos necesarios";
        break;

      case errorRecibido.hasOwnProperty('maxLength'):
        message = "Este campo tiene el maximo de longitud";
        break;

      case errorRecibido.hasOwnProperty('email'):
        message = "Este campo debe contener un @ para un correo electronico";
        break;

      case errorRecibido.hasOwnProperty('password'):
        message = "Este campo debe tener mínimo 8 caracteres y máximo 15 caracteres incluyendo numeros y letras";
        break;

      case errorRecibido.hasOwnProperty('compare'):
        message = "Este campo debe coincidir con la contraseña anterior";
        break;

      case errorRecibido.hasOwnProperty('onlyAlpha'):
        message = "Este campo tiene datos innecesarios";
        break;

      case errorRecibido.hasOwnProperty('digit'):
        message = "Este campo solo debe tener numeros";
        break;
    }

    return {
      message,
      error: true,
    };
  }
}
