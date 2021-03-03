import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Validations } from 'src/app/validations/validations';

@Component({
  selector: 'app-modificar-password',
  templateUrl: './modificar-password.component.html',
  styleUrls: ['./modificar-password.component.scss']
})
export class ModificarPasswordComponent implements OnInit {

  form: FormGroup; 
  usuarioAutenticado: Usuario; 
  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl ('', [Validators.required]),
      newPassword: new FormControl ('', [Validators.required]),
    });    

    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.comunicadorAlertas.abrirDialogCargando();
        this.usuarioAutenticado = usuario;
        this.form.controls.currentPassword.setValidators([Validations.comprobarCurrentPassword(this.usuarioAutenticado.password)]);
        this.comunicadorAlertas.cerrarDialogo();
      }
    });
  }

  modificarPassword() {
    this.comunicadorAlertas.abrirDialogCargando();
    this.usuarioService.modificarPassword(this.form.controls.newPassword.value).subscribe(data => {
      this.comunicadorAlertas.cerrarDialogo();
      if (data['result'] == 'fail')
        this.comunicadorAlertas.abrirDialogError('Error al modificar la contraseña, inténtelo más tarde');
      else
        this.comunicadorAlertas.abrirDialogInfo('Contraseña modificada').subscribe(result => {
          this.router.navigate(['/portal']);
        });
    });
  }
  
}
