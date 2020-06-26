import { Component, OnInit } from '@angular/core';
import { UserDataBaseService } from "./../../Services/user-data-base.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styles: []
})
export class VerUsuariosComponent implements OnInit {

  public ArregloUsuarios: Array<any> = [];


  constructor(private UserDB: UserDataBaseService, private router: Router) {
    this.UserDB.ObtenerUsuarios().subscribe((value) => this.ArregloUsuarios = value);
  }

  ngOnInit(): void {
  }

  public IrActualizar(id: string) {
    this.router.navigate(["actualizar", id])
  }
}
