import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Apuesta, Evento, Usuario } from 'src/app/interfaces/interfaces';
import { ApuestaService } from 'src/app/services/apuesta.service';
import { EventoService } from 'src/app/services/evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validations } from 'src/app/validations/validations';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';

@Component({
  selector: 'app-ventana-apuesta',
  templateUrl: './ventana-apuesta.component.html',
  styleUrls: ['./ventana-apuesta.component.scss']
})
export class VentanaApuestaComponent implements OnInit {

  formApuesta: FormGroup;
  evento: Evento = null;
  apuesta: Apuesta = null;
  usuarioAutenticado: Usuario;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private apuestaService: ApuestaService,
    private comunicadorDeAlertas: ComunicacionDeAlertasService,
    private eventoService: EventoService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.usuarioAutenticado = usuario;
        this.formApuesta = new FormGroup({
          puntuacion1: new FormControl ('', [Validators.required, Validators.pattern('[0-9]+')]),
          puntuacion2: new FormControl ('', [Validators.required, Validators.pattern('[0-9]+')]),
          resultado: new FormControl ('', [Validators.required]),
          cantidad: new FormControl ('', [Validators.required, Validators.max(this.usuarioAutenticado.saldo)])
        }, Validations.validacionPuntuaciones);  
              
        let idevento = sessionStorage.getItem('idevento') ? parseInt(sessionStorage.getItem('idevento')) : this.router.navigate(['/portal']);
        let idapuesta = sessionStorage.getItem('idapuesta') ? parseInt(sessionStorage.getItem('idapuesta')) : 0;
        if (!idapuesta) sessionStorage.removeItem('idapuesta');

        this.eventoService.getEventoById(idevento).subscribe(data => {
          if (data['result'] == 'fail')
            this.comunicadorDeAlertas.abrirDialogInfo('Error al cargar el evento').subscribe(() => {
              this.router.navigate(['/portal']);
            });
          else
            this.evento = data['evento'];
        });  
        if (idapuesta != 0) {
          this.apuestaService.getApuestaById(idapuesta).subscribe(data => {
            if (data['result'] == 'fail')
              this.comunicadorDeAlertas.abrirDialogInfo('Error al cargar la apuesta').subscribe(() => {
                this.router.navigate(['/portal']);
              });
            else {
              this.apuesta = data['apuesta'];
              this.cargarDatosEnFormulario();
            }
          }); 
        }    
        if (usuario.saldo < 0) this.comunicadorDeAlertas.mostrarMensajesSnackbar(['Su saldo es negativo, no podrá realizar apuestas'], 'Cerrar', 5000);
      }
    });
  }

  apostar() {
    var idapuesta = (this.apuesta != null)? this.apuesta.idapuesta : 0;

    var ganador = (this.formApuesta.controls.resultado.value == 1)? this.evento.participante1.id : 
                  (this.formApuesta.controls.resultado.value == 2)? this.evento.participante2.id : 0;
    var cuota = parseFloat((<HTMLInputElement>document.getElementById("cuota")).value);
    var premioPotencial = parseFloat((<HTMLInputElement>document.getElementById("premio")).value);
    this.apuestaService.setNuevaApuesta(idapuesta, this.formApuesta.controls.cantidad.value, ganador, cuota, this.evento.id, 
        this.formApuesta.controls.puntuacion1.value, this.formApuesta.controls.puntuacion2.value, premioPotencial).subscribe(data => {
        if (data['result'] == 'ok') {
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
          this.comunicadorDeAlertas.abrirDialogInfo('Apuesta tramitada con éxito').subscribe(result => {
            this.router.navigate(['/misApuestas']);
          });
        }
        else {
          this.comunicadorDeAlertas.abrirDialogError('Error al tramitar su apuesta, inténtelo más tarde');
        }
    });
  }

  cargarDatosEnFormulario() {
    var resultado = (this.apuesta.puntuacion1 > this.apuesta.puntuacion2)? '1' : (this.apuesta.puntuacion1 < this.apuesta.puntuacion2)? '2' : 'X';
    this.formApuesta.controls.resultado.setValue(resultado);
    this.formApuesta.controls.puntuacion1.setValue(this.apuesta.puntuacion1);
    this.formApuesta.controls.puntuacion2.setValue(this.apuesta.puntuacion2);
    this.formApuesta.controls.cantidad.setValue(this.apuesta.cantidadApostada);
  }

}
