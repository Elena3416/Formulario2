import { Injectable } from '@angular/core';
import { UserDataBaseService } from "./user-data-base.service";
import { ValidationErrors, FormControl } from '@angular/forms';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesErroresService {

  constructor(private UserDB:UserDataBaseService) { }

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

      case errorRecibido.hasOwnProperty('ascii'):
        message = "Este campo ingresa letras, numeros y caracteres especiales";
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

      case errorRecibido.hasOwnProperty('NombreUsuarioExistente'):
        message = "El usuario ya existe, favor de ingresar otro usuario";
        break;

      case errorRecibido.hasOwnProperty("EmailExistente"):
        message = "El email ya existe, favor de ingresar otro email";
        break;
      
        case errorRecibido.hasOwnProperty("RFCExistente"):
          message = "El RFC ya existe, favor de ingresar otro RFC";
          break;
    }

    return {
      message,
      error: true,
    };
  }

  //Se verifica el nombre de usuario, si existe o no en la base de datos
  public verificarNombreUsuarioNoExista(control:FormControl):Observable<ValidationErrors|null>{
   return this.UserDB.GetNombreUsuario(control.value).pipe(
     map(valor => {
       if(valor.docs.length > 0){
         return {
           NombreUsuarioExistente: true,
         }
       }else {
         return null
       }
     })
   )};

   public verificarEmailNoExista(control:FormControl):Observable<ValidationErrors|null>{
    return this.UserDB.GetEmail(control.value).pipe(
      map(valor => {
        if(valor.docs.length > 0){
          return {
            EmailExistente: true,
          }
        }else {
          return null
        }
      })
    )};

    public verificarrfcNoExista(control:FormControl):Observable<ValidationErrors|null>{
      return this.UserDB.GetRFC(control.value).pipe(
        map(valor => {          
          if(valor.docs.length > 0){
            return {
              RFCExistente: true,
            }
          }else {
            return null
          }
        })
      )};
  }