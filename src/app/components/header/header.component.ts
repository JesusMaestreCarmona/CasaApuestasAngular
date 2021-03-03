import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogTypes } from '../dialogo-general/dialog-data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  usuarioAutenticado: Usuario; // Guardo el usuario autenticado
  
  // Necesito varios objetos inyectados en este componente
  constructor(private comunicacionAlertasService: ComunicacionDeAlertasService,
    private autenticacionPorJWT: AutenticadorJwtService,
    private router: Router,
    private usuarioService: UsuarioService) { }


  ngOnInit () {
    this.usuarioService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    });
  }

  /**
   * El logo de la barra de herramientas nos llevará al listado de mensajes
   */
  navegarHaciaPrincipal() {
    this.router.navigate(['/portal']);
  } 
  
  /**
   * Confirmación de que deseamos abandonar la sesión
   */
  dialogoAbandonarSesion() {
    this.comunicacionAlertasService.abrirDialogConfirmacion ('¿Realmente desea abandonar la sesión?').subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.autenticacionPorJWT.eliminaJWT();
        this.usuarioAutenticado = null;
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Navegar hacia el componente de modificación de los datos del usuario
   */
  misApuestas () {
    this.router.navigate(['/misApuestas']);
  }

  modificarDatosUsuario() {
    this.router.navigate(['/modificarDatosUsuario']);
  }

  modificarPassword() {
    this.router.navigate(['/modificarPassword']);
  }

}
