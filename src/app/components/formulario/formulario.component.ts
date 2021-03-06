import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ValidacionesErroresService } from "./../../Services/validaciones-errores.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { CountryService } from "./../../../app/Services/country.service";
import {UserDataBaseService} from "./../../Services/user-data-base.service";
import { Usuario } from 'src/app/Interfaces/user.interface';
import {Router} from "@angular/router";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent implements OnInit{

  public NameCountries: Array<string> = [];
  public UsuarioPendiente:any;

  constructor(private ASErrorMsg: ValidacionesErroresService, private AWServices: CountryService,
    private UserDB:UserDataBaseService, private Router:Router) {
    this.AWServices.GetCountries().subscribe((country:string) => this.NameCountries.push(country));
  }

  ngOnInit(): void {
    this.Createformulario();

    this.UsuarioPendiente = JSON.parse(localStorage.getItem('UsuarioPendiente'));

    this.formulario.patchValue(this.UsuarioPendiente);
  }

//Cuando el cliente llena la informacion pero no lo completa
  ngOnDestroy(): void{
    //crea un propiedad, que va hacer igual al 
    const ValoresFormulario = this.formulario.value;

    localStorage.setItem('UsuarioPendiente', JSON.stringify(ValoresFormulario));
    
  }
  public formulario: FormGroup;

  public Createformulario() {

    this.formulario = new FormGroup({

      Nickname: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.ascii(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 15 })
      ],
      this.ASErrorMsg.verificarNombreUsuarioNoExista.bind(this)),

      Email: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ],
      this.ASErrorMsg.verificarEmailNoExista.bind(this)),

      Password: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.password({ validation: { maxLength: 15, minLength: 8, digit: true, specialCharacter: true } })
      ]),

      ConfirmPassword: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.password({ validation: { maxLength: 15, minLength: 8, digit: true, specialCharacter: true } }),
        RxwebValidators.compare({ fieldName: "Password" })
      ]),

      NombreCompleto: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      RFC: new FormControl(null, [
        RxwebValidators.alphaNumeric(),
        RxwebValidators.maxLength({ value: 13 })
      ],
      this.ASErrorMsg.verificarrfcNoExista.bind(this)),

      Telefono: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.minLength({ value: 7 }),
        RxwebValidators.maxLength({ value: 10 })
      ]),

      Direccion: new FormControl(null, [
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      Numero: new FormControl(null, [
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 5 })
      ]),

      Colonia: new FormControl(null, [
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      Floor: new FormControl(null, [
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 6 })
      ]),

      Letter: new FormControl(null, [
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      CodigoPostal: new FormControl(null, [
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 5 })
      ]),

      Localidad: new FormControl(null, [
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      Continente: new FormControl(null, [
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 10 })
      ]),

      Pais: new FormControl(null, [
        RxwebValidators.maxLength({ value: 10 })
      ]),
    })
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.ASErrorMsg.ErrorMensage(this.formulario.controls[control].errors);
  }

  //mandar llamar al servicio userdb con el metodo guardarusuario
  public GuardarUsuario(){
    
    if(!this.formulario.valid) {
      alert ('Formulario Invalido');
      return;
    };

    const Usuario:Usuario = this.formulario.value;
    this.UserDB.GuardarUsuario(Usuario);

    //cuando se guarde la informacion en la bd, se limpia la informacion en el localstorage
    localStorage.clear();
    //Se limpia la informacion del formulario
    this.formulario.reset();
  }

  public VerUsuarios(){
    this.Router.navigate(["verusuarios"]);
  }
}