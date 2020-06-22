import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ValidacionesErroresService } from "./../../Services/validaciones-errores.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { CountryService } from "./../../../app/Services/country.service";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})
export class FormularioComponent implements OnInit {

  public NameCountries: Array<string> = [];
  public Region: Array<string> = [];

  constructor(private ASErrorMsg: ValidacionesErroresService, private AWServices: CountryService) {
    this.AWServices.GetCountries().subscribe((country) => this.NameCountries.push(country));
  }

  ngOnInit(): void {
    this.Createformulario();
  }

  public formulario: FormGroup;

  public Createformulario() {

    this.formulario = new FormGroup({

      NombreUsuario: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alphaNumeric(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 15 })
      ]),

      email: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      password: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.password({ validation: { maxLength: 15, minLength: 8, digit: true, specialCharacter: true } })
      ]),

      repeatpassword: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.password({ validation: { maxLength: 15, minLength: 8, digit: true, specialCharacter: true } }),
        RxwebValidators.compare({ fieldName: "password" })
      ]),

      nombreapellidos: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      RFC: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 16 })
      ]),

      telefono: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.minLength({ value: 7 }),
        RxwebValidators.maxLength({ value: 10 })
      ]),

      address: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      Number: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 5 })
      ]),

      street: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      floor: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 6 })
      ]),

      letter: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      zipcode: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.digit(),
        RxwebValidators.maxLength({ value: 5 })
      ]),

      Localidad: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.pattern({ expression: { onlyAlpha: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/ } }),
        RxwebValidators.minLength({ value: 5 }),
        RxwebValidators.maxLength({ value: 30 })
      ]),

      Provincia: new FormControl(null, [
        RxwebValidators.required()
      ]),

      Pais: new FormControl(null, [
        RxwebValidators.required()
      ]),
    })
  }

  public limpiarInformacion() {
    console.clear();
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };

    return this.ASErrorMsg.ErrorMensage(this.formulario.controls[control].errors);
  }

}

