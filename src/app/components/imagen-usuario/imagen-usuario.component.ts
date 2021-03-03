import { Component, Input } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-imagen-usuario',
  templateUrl: './imagen-usuario.component.html',
  styleUrls: ['./imagen-usuario.component.scss']
})
export class ImagenUsuarioComponent {

  @Input('imagen') imagen: string;
  @Input('width') width: number;
  @Input('height') height: number;

  constructor() { }
}
