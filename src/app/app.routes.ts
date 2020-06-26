import { RouterModule, Routes } from "@angular/router";
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const Rutas: Routes = [
    { path: 'GuardarUsuario', component: FormularioComponent },
    { path: 'verusuarios', component: VerUsuariosComponent },
    { path: 'actualizar/:id', component: ActualizarUsuarioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'GuardarUsuario' }
];

export const APP_ROUTES = RouterModule.forRoot(Rutas, { useHash: true });


