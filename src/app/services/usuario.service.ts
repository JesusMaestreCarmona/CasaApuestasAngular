import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosConJwt } from '../interfaces/interfaces'
import { Md5 } from 'ts-md5/dist/md5'; // Para codificar en MD5
import { Usuario } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario; 
  @Output()  
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }

  autenticarUsuario (email: string, password: string) : Observable<DatosConJwt> {
    const md5 = new Md5();
    var jsonObject = {
      email: email,
      password: md5.appendStr(password).end().toString()  
    };

    return this.http.post<DatosConJwt>('/usuario/autenticar', jsonObject);
  }

  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario> {
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen).pipe(
      tap(usuarioAutenticado => {
        if ( (this.usuarioAutenticado == null && usuarioAutenticado != null) || 
          (this.usuarioAutenticado != null && usuarioAutenticado == null) ||  
          (this.usuarioAutenticado != null && usuarioAutenticado != null && this.usuarioAutenticado.id != usuarioAutenticado.id) ) { 
            this.emitirNuevoCambioEnUsuarioAutenticado();
            this.usuarioAutenticado = usuarioAutenticado;
          }
      })
    );
  }

  registrarUsuario(email: string, password: string, nombre: string, apellidos: string, imagen: string, tipoSexo: number): Observable<string> {
    const md5 = new Md5();
    var jsonObject = {
      'apellidos': apellidos,
      'imagen': imagen,
      'email': email,
      'nombre': nombre,
      'password': md5.appendStr(password).end().toString(),
      'tipoSexo': tipoSexo
    };
    console.log(jsonObject);
    return this.http.put<string>('/usuario/registrarUsuario', jsonObject);
  }

  buscarEmail(email: string): Observable<string> {
    return this.http.get<string>('/usuario/buscarEmail?email=' + email);
  }

  actualizarDatosUsuario(nombre: string, apellidos: string, imagen: string, tipoSexo: number): Observable<string> {
    var jsonObject = {
      'apellidos': apellidos,
      'imagen': imagen,
      'nombre': nombre,
      'tipoSexo': tipoSexo
    };
    return this.http.put<string>('/usuario/actualizarDatosUsuario', jsonObject).pipe(
      tap(data => {
        this.emitirNuevoCambioEnUsuarioAutenticado();
      })
    );
  }

  modificarPassword(password) {
    const md5 = new Md5();
    var jsonObject = { 'password': md5.appendStr(password).end().toString() };
    return this.http.put<string>('/usuario/modificarPassword', jsonObject).pipe(
      tap(data => {
        this.emitirNuevoCambioEnUsuarioAutenticado();
      })
    );
  }

  emitirNuevoCambioEnUsuarioAutenticado () {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    });
  }

}
