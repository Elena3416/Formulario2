import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CapitalizeDirective } from "./../app/Directives/capitalize.directive";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { HttpClientModule } from "@angular/common/http";
//Agregamos el modulo de angular fire y la configuracion que hicimos en el enviroment
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {environment} from "./../environments/environment";
import { NgClicksDirective } from './Directives/ng-clicks.directive';
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    CapitalizeDirective,
    NgClicksDirective,
    VerUsuariosComponent,
    ActualizarUsuarioComponent,
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    //inicializar el angularfire
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
    //Ayuda a realizar los quierys para hacer modificacion a la base de datos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
