import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Evento, Usuario, Apuesta } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { ApuestaService } from 'src/app/services/apuesta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  usuarioAutenticado: Usuario; 
  nombresDeColumnas: string[] = ['Fecha', 'Categoria',  'img1', 'Participante1', 'img2', 'Participante2', '1', 'X', '2'];
  eventosDisponibles: Evento[];
  numeroEventosDelDia: number;
  dataSourceTabla: MatTableDataSource<Evento>;

  constructor(private eventoService: EventoService, 
    private usuarioService: UsuarioService, 
    private router: Router,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private apuestaService: ApuestaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.comunicadorAlertas.abrirDialogCargando();
        this.usuarioAutenticado = usuario;
        this.actualizarListaEventos();
        this.comunicadorAlertas.cerrarDialogo();
      }
    });
  }

  actualizarListaEventos() {
    this.comunicadorAlertas.abrirDialogCargando();
    this.eventoService.actualizarEventos().subscribe(data => {
      this.comunicadorAlertas.cerrarDialogo();
      if (data['result'] == 'ok')
        this.getAllEventos();
      else 
        this.comunicadorAlertas.abrirDialogError('Ha habido un problema al cargar los eventos');
    })
  }

  getAllEventos() {
    this.eventoService.getAllEventos().subscribe(data => {
      if (data['result'] == 'ok') {
        let eventos = data['eventos'];
        if (eventos.length != 0) {
          this.numeroEventosDelDia = 0;
          this.eventosDisponibles = eventos;
          this.eventosDisponibles.forEach(evento => { if (this.comprobarSiEventoDelDia(evento.fecha)) this.numeroEventosDelDia++; });
          this.dataSourceTabla = new MatTableDataSource<Evento>(this.eventosDisponibles);
          this.comprobarApuestasANotificar();
          console.log('1');
        }
      }
      else 
        this.comunicadorAlertas.abrirDialogError('Ha habido un problema al cargar los eventos');
    });    
  }

  comprobarApuestasANotificar() {
    console.log('2');
    this.apuestaService.getApuestasANotificarUsuario().subscribe(data => {
      this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
      var apuestasANotificar = data['apuestasANotificar'];
      console.log(apuestasANotificar);
      var mensajesAMostrar = [];
      apuestasANotificar.forEach(apuestaANotificar => {
        mensajesAMostrar.push('Su apuesta al evento ' + apuestaANotificar.evento.participante1.nombre + ' - ' + 
                              apuestaANotificar.evento.participante2.nombre + 
                              ', ha sido premiada con ' + apuestaANotificar.premio + '€');
      });
      var accion = 'Mis apuestas';
      this.comunicadorAlertas.mostrarMensajesSnackbar(mensajesAMostrar, accion, 3000);
    });
  }

  navegarAVentanaApuesta(idevento) {
    this.router.navigate(['/ventanaApuesta']);
    sessionStorage.setItem('idevento', idevento);
    sessionStorage.setItem('idapuesta', '' + 0);
  }

  comprobarSiEventoDelDia(eventDate) {
    let dayInMillis = 1000 * 60 * 60 * 24;
    let eventDay = Math.floor(eventDate/dayInMillis);
    let currentDay = Math.floor(Date.now()/dayInMillis);

    if (eventDay == currentDay)
      return 1;

    return 0;
  }
  

}
