import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Usuario} from "./../../app/Interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class UserDataBaseService {

  constructor(private afs:AngularFirestore) { }

  public GuardarUsuario(Usuario:Usuario){
    //Se crea un id con el metodo createid
    const idUsuario = this.afs.createId();
    //el nuevo usuario va a tener id y nombre
    const NuevoUsuario = {...Usuario, id:idUsuario};
    //lo guarda en el objeto usuarios
    this.afs.collection('Usuarios').add(NuevoUsuario);
  }

  //Obtener los datos de la base de datos
  public ObtenerUsuarios(){
    //ValueChanges sirve para actualizar automaticamente los cambios que se hacen en la base de datos
    return this.afs.collection('Usuarios').valueChanges();
  }
  //Obtener un unico usuario
  public ObtenerUsuarioUnico(idUsuario:string){
    return this.afs.collection('Usuarios', ref => ref.where('id', '==', idUsuario)).valueChanges();
  }

  /*************************************************
  obtener el valor del nickname
  *************************************************/
  public GetNombreUsuario(NombreUsuario:string){
    return this.afs.collection('Usuarios', ref => ref.where('Nickname', '==', NombreUsuario)).get(); 
  }

  /*************************************************
  Obtener el valor del email
  *************************************************/
  public GetEmail(Email:string){
    return this.afs.collection('Usuarios', ref => ref.where('Email', "==", Email)).get();
  }
  
  /*************************************************
  Obtener el valor del rfc
  *************************************************/
  public GetRFC(RFC:string){
    return this.afs.collection('Usuarios', ref => ref.where('RFC', "==", RFC)).get();
  }
}
