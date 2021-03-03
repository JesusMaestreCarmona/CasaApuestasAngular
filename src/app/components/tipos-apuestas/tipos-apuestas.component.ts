import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Apuesta } from 'src/app/interfaces/interfaces';
import { ApuestaService } from 'src/app/services/apuesta.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogTypes } from '../dialogo-general/dialog-data-type';

@Component({
  selector: 'app-tipos-apuestas',
  templateUrl: './tipos-apuestas.component.html',
  styleUrls: ['./tipos-apuestas.component.scss']
})
export class TiposApuestasComponent implements OnInit {

  @Input('apuestas') apuestasUsuario: Apuesta[];
  @Input('tipo') tipo: string;
  @Output() refreshClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private apuestaService: ApuestaService, 
    private usuarioService: UsuarioService,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private router: Router) { }

  ngOnInit(): void {
    this.apuestasUsuario = [];
    this.apuestaService.cambiosEnApuesta.subscribe(data => {
      this.apuestasUsuario = data['apuestas'];
    });
  }

  borrarApuesta(id: number) {
    this.comunicadorAlertas.abrirDialogConfirmacion ('¿Realmente desea borrar esta apuesta?').subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.apuestaService.borrarApuesta(id).subscribe(data => {
          if (data['result'] == 'ok') {
            console.log(data['apuestas']);
            this.comunicadorAlertas.abrirDialogInfo('Apuesta borrada con éxito, su saldo se ha restaurado');
            this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
            this.apuestaService.emitirNuevoCambioEnApuestasUsuario(false);
          }
          else {
            this.comunicadorAlertas.abrirDialogError('Error al borrar su apuesta, inténtelo más tarde');
          }
        });
      }
    });
  }

  modificarApuesta(idevento, idapuesta) {
    this.router.navigate(['/ventanaApuesta']);
    sessionStorage.setItem('idevento', idevento);
    sessionStorage.setItem('idapuesta', idapuesta);
  }

}
