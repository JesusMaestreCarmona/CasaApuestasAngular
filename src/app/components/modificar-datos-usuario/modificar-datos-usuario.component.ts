import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoSexo, Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { TipoSexoService } from 'src/app/services/tipo-sexo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-datos-usuario',
  templateUrl: './modificar-datos-usuario.component.html',
  styleUrls: ['./modificar-datos-usuario.component.scss']
})
export class ModificarDatosUsuarioComponent implements OnInit {

  form: FormGroup; 
  usuarioAutenticado: Usuario;
  tiposSexo: TipoSexo[]; 

  constructor(private usuarioService: UsuarioService, 
    private router: Router,
    private comunicadorAlertas: ComunicacionDeAlertasService,
    private tipoSexoService: TipoSexoService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.comunicadorAlertas.abrirDialogCargando();
        this.cargarTiposSexo();
        this.usuarioAutenticado = usuario;
        this.cargarDatosUsuarioEnFormulario();
        this.comunicadorAlertas.cerrarDialogo();
      }
    });

    this.form = new FormGroup({
      nombre: new FormControl ('', [Validators.required]),
      apellidos: new FormControl ('', [Validators.required]),
      sexo: new FormControl ('', [Validators.required])
    });    
  }

  cargarDatosUsuarioEnFormulario() {
    this.form.controls.nombre.setValue(this.usuarioAutenticado.nombre);
    this.form.controls.apellidos.setValue(this.usuarioAutenticado.apellidos);
    this.form.controls.sexo.setValue(this.usuarioAutenticado.tiposexo.id);
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
        this.usuarioAutenticado.imagen = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

  actualizarDatosUsuario() {
    this.comunicadorAlertas.abrirDialogCargando();
    this.usuarioService.actualizarDatosUsuario(this.form.controls.nombre.value, this.form.controls.apellidos.value, 
      this.usuarioAutenticado.imagen, this.form.controls.sexo.value).subscribe(data => {
        this.comunicadorAlertas.cerrarDialogo();
        if (data['result'] == 'ok')
          this.comunicadorAlertas.abrirDialogInfo('Datos actualizados con éxito').subscribe(result => {
            this.router.navigate(['/portal']);
          });
        else
          this.comunicadorAlertas.abrirDialogError('Ha habido un problema al actualizar los datos del usuario');
      });
  }

}
