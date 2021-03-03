import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apuesta } from 'src/app/interfaces/interfaces';
import { ApuestaService } from 'src/app/services/apuesta.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-apuestas',
  templateUrl: './mis-apuestas.component.html',
  styleUrls: ['./mis-apuestas.component.scss']
})
export class MisApuestasComponent implements OnInit {

  apuestasUsuario: Apuesta[];
  currentTab: number = 0;

  constructor(private apuestaService: ApuestaService,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      if (usuario == null) { // Si no hay usuario autenticado, redirijo al login
        this.router.navigate(['/login']);
      }
      else {
        this.getAllApuestas(false);
      }
    });
  }

  getAllApuestas(tipo) {
    this.currentTab = tipo;
    this.comunicadorAlertas.abrirDialogCargando();
    this.apuestaService.getApuestasUsuario(this.currentTab).subscribe(data => {
      this.comunicadorAlertas.cerrarDialogo();
      if (data['result'] == 'fail') {
        this.comunicadorAlertas.abrirDialogError("Ha habido un error al recuperar sus apuestas, inténtelo más tarde");
        this.router.navigate(['/portal']);
      }
      else {
        this.apuestasUsuario = data['apuestas'];
        if (this.apuestasUsuario.length == 0) {
          this.comunicadorAlertas.abrirDialogInfo('No hay registros pertencientes a esta sección');
        }
      }
    });
  }

  navegarAPortal() {
    this.router.navigate(['/portal']);
  }
  
  public onButtonClick(event: MouseEvent): void {
    console.log("Clicked");
  }

}
