import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MisApuestasComponent } from './components/mis-apuestas/mis-apuestas.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { VentanaApuestaComponent } from './components/ventana-apuesta/ventana-apuesta.component';
import { ModificarDatosUsuarioComponent } from './components/modificar-datos-usuario/modificar-datos-usuario.component';
import { ModificarPasswordComponent } from './components/modificar-password/modificar-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'ventanaApuesta', component: VentanaApuestaComponent },
  { path: 'misApuestas', component: MisApuestasComponent },
  { path: 'modificarDatosUsuario', component: ModificarDatosUsuarioComponent },
  { path: 'modificarPassword', component: ModificarPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
