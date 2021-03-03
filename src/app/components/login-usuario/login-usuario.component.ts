import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;
  hide: Boolean = true;

  constructor(private usuarioService: UsuarioService, 
    private comunicadorAlertas: ComunicacionDeAlertasService, 
    private autenticadorJwtService: AutenticadorJwtService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl ('jesus@jesus.com', [Validators.required, Validators.email]),
      password: new FormControl ('1234', [Validators.required])
    });
  }

  autenticarUsuario() {
    this.comunicadorAlertas.abrirDialogCargando();
    this.usuarioService.autenticarUsuario(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(data => {
      if (data.jwt != undefined) {
        this.autenticadorJwtService.almacenaJWT(data.jwt);
        this.router.navigate(['/portal']);
        this.comunicadorAlertas.cerrarDialogo(); 
        this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); 
      } 
      else {
        this.comunicadorAlertas.abrirDialogError('El usuario y contraseña introducidos no permiten el acceso');
      }
    });
  }

  navegarARegistrarUsuario() {
    this.router.navigate(['registro']);
  }

  

}
