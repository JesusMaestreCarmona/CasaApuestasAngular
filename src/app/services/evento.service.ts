import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getAllEventos() : Observable<string> {
    return this.http.get<string>('/eventos/all');
  }

  getEventoById(id) : Observable<string> {
    return this.http.get<string>('/eventos/findById?id=' + id);
  }

  actualizarEventos() : Observable<string> {
    return this.http.get<string>('/eventos/actualizarLista');
  }

}
