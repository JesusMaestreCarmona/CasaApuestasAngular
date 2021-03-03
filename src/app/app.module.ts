import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoGeneralComponent } from './components/dialogo-general/dialogo-general.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PortalComponent } from './components/portal/portal.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ImagenUsuarioComponent } from './components/imagen-usuario/imagen-usuario.component';
import { HeaderComponent } from './components/header/header.component';
import { VentanaApuestaComponent } from './components/ventana-apuesta/ventana-apuesta.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MisApuestasComponent } from './components/mis-apuestas/mis-apuestas.component'; 
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { TiposApuestasComponent } from './components/tipos-apuestas/tipos-apuestas.component';
import { MatChipsModule } from '@angular/material/chips';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ModificarDatosUsuarioComponent } from './components/modificar-datos-usuario/modificar-datos-usuario.component';
import { ModificarPasswordComponent } from './components/modificar-password/modificar-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    DialogoGeneralComponent,
    PortalComponent,
    ImagenUsuarioComponent,
    HeaderComponent,
    VentanaApuestaComponent,
    MisApuestasComponent,
    TiposApuestasComponent,
    RegistroUsuarioComponent,
    ModificarDatosUsuarioComponent,
    ModificarPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatStepperModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
