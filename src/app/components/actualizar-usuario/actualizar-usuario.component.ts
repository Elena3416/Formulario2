import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ValidacionesErroresService } from "./../../Services/validaciones-errores.service";
import { ActivatedRoute } from '@angular/router';
import { switchMap, pluck } from 'rxjs/operators';
import { UserDataBaseService } from "./../../Services/user-data-base.service";
import { CountryService } from "./../../Services/country.service";
import { Router } from "@angular/router";
import { Usuario } from "./../../Interfaces/user.interface";

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ["./actualizar-usuario.component.css"]
})

export class ActualizarUsuarioComponent implements OnInit {

  public formulario: FormGroup;
  public UsuarioRecibido: any;
  public loading: boolean;
  public NameCountries: Array<string> = [];

  constructor(private ASErrorMsg: ValidacionesErroresService, private AR: ActivatedRoute,
    private UsuarioDb: UserDataBaseService, private AWServices: CountryService,
    private router: Router) {

    this.AWServices.GetCountries().subscribe((country: string) => this.NameCountries.push(country));
    this.loading = true;
    this.AR.params.pipe(
      pluck('id'),
      switchMap((idUsuario) => this.UsuarioDb.ObtenerUsuarioUnico(idUsuario))
    ).subscribe((Usuario: any) => {
      this.UsuarioRecibido = Usuario[0],
        this.formulario.patchValue(this.UsuarioRecibido);
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.Createformulario();
  }

  public Createformulario() {

    this.formulario = new FormGroup({

      Nickname: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.ascii(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 15 })
      ]),

      Email: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

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
      ]),

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

  // public VerUsuarios() {
  //   this.router.navigate(["verusuarios"]);
  // }

  public GuardarUsuario() {
    if (!this.formulario.valid) {
      alert('Formulario Invalido');
      return;
    };

    const Usuario: Usuario = this.formulario.value;
    this.UsuarioDb.GuardarUsuario(Usuario);

    //cuando se guarde la informacion en la bd, se limpia la informacion en el localstorage
    localStorage.clear();
    //Se limpia la informacion del formulario
    this.formulario.reset();
  }

}