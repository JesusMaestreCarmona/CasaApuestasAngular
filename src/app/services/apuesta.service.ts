import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apuesta } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApuestaService {

  @Output()  
  cambiosEnApuesta = new EventEmitter<Apuesta[]>(); // Evento cuando el usuario autenticado

  constructor(private http: HttpClient) { }

  setNuevaApuesta(idapuesta: number, cantidadApostada: number, ganador: number, cuota: number, evento: number, puntuacion1: number, puntuacion2: number, premioPotencial: number): Observable<String> {
    var dto = {
      'idapuesta': idapuesta,
      'cantidadApostada': cantidadApostada,
      'ganador': ganador,
      'cuota': cuota,
      'evento': evento,
      'puntuacion1': puntuacion1,
      'puntuacion2': puntuacion2,
      'premioPotencial': premioPotencial
    };
    return this.http.put<String>('/apuestas/nueva', dto);
  }

  getApuestasUsuario(terminado): Observable<Apuesta[]> {
    return this.http.get<Apuesta[]>('/apuestas/getApuestasUsuario?terminado=' + terminado);
  }

  borrarApuesta(id: number): Observable<String> {
    return this.http.delete<String>('/apuestas/borrar?id=' + id);
  }

  getApuestaById(id): Observable<String> {
    return this.http.get<String>('/apuestas/findById?id=' + id);
  }

  getApuestasANotificarUsuario(): Observable<String> {
    return this.http.get<String>('/apuestas/getApuestasUsuarioANotificar');
  }

  emitirNuevoCambioEnApuestasUsuario (terminado: boolean) {
    this.getApuestasUsuario(terminado).subscribe(apuestasUsuario => {
      this.cambiosEnApuesta.emit(apuestasUsuario);
    });
  }


}
