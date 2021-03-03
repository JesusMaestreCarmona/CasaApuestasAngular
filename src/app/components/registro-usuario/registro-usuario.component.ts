import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoSexo, Usuario } from 'src/app/interfaces/interfaces';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { TipoSexoService } from 'src/app/services/tipo-sexo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Validations } from 'src/app/validations/validations';
import { DialogTypes } from '../dialogo-general/dialog-data-type';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {

  formDatosPersonales: FormGroup;
  formDatosLogin: FormGroup;
  formImagen: FormGroup;
  tiposSexo: TipoSexo[];
  imagenActual: string;
  hide: Boolean = true;
  errorEmailExiste: boolean = false;

  constructor(private tipoSexoService: TipoSexoService, 
    private usuarioService: UsuarioService,
    private router: Router,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private autenticadorJwtService: AutenticadorJwtService) { }

  ngOnInit(): void {
    this.cargarTiposSexo();

    this.formDatosPersonales = new FormGroup({
      nombre: new FormControl ('', [Validators.required]),
      apellidos: new FormControl ('', [Validators.required]),
      sexo: new FormControl ('', [Validators.required])
    });

    this.formDatosLogin = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email], [this.comprobarSiExisteEmail()]),
      password: new FormControl ('', [Validators.required])
    });

    this.formImagen = new FormGroup({
      imagen: new FormControl ('', [Validators.required])
    });

  }

  comprobarSiExisteEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usuarioService.buscarEmail(control.value).pipe(
        map(data => {
          return (data['emailEncontrado'] == true)? { emailExiste: true } : null;
        })
      );
    };
  }

  cargarTiposSexo() {
    this.tiposSexo = [];
    this.tipoSexoService.getListadoTiposSexo().subscribe(tiposSexo => tiposSexo.forEach(tipo =>
      this.tiposSexo.push(tipo)));
  }

  usuarioSeleccionaFicheroImagen() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') { 
      const reader = new FileReader(); 

      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onload = (e: any) => {
        this.imagenActual = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.formDatosLogin.controls.email.value, 
      this.formDatosLogin.controls.password.value,
      this.formDatosPersonales.controls.nombre.value,
      this.formDatosPersonales.controls.apellidos.value,
      this.imagenActual,
      this.formDatosPersonales.controls.sexo.value).subscribe(data => {
        if (data['result'] == 'ok') {
          this.usuarioService.autenticarUsuario(this.formDatosLogin.controls.email.value, this.formDatosLogin.controls.password.value).subscribe(data => {
            this.autenticadorJwtService.almacenaJWT(data.jwt); // Almaceno un nuevo JWT
            this.router.navigate(['/portal']); // Navego hasta listado de mensajes
            this.comunicadorAlertas.cerrarDialogo(); // Cierro el diálogo de espera
            this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); // Emito evento de cambio en usuario autenticado    
          });
        }
        else {
          this.comunicadorAlertas.abrirDialogInfo('Ha habido un error durante el registro, será redirigido al login al cerrar esta ventana').subscribe(opcionElegida => {
            this.router.navigate(['/login']);
          });
        }
      });
  }

}
