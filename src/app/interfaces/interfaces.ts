export interface Usuario {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellidos: string;
    saldo: number;
    imagen: string;
    tiposexo: TipoSexo;
}

export interface DatosConJwt {
    jwt: string;
}

export interface Evento {
    id: number;
    cuota1: number;
    cuota2: number;
    cuotax: number;
    fecha: number;
    categoria: Categoria;
    participante1: Participante;
    participante2: Participante;
    resultado: resultado;
    terminado: boolean;
}

export interface Participante {
    id: number;
    nombre: string;
    imagen: string;
}

export interface Categoria {
    id: number;
    descripcion: string;
}

export interface Apuesta {
    idapuesta: number;
    fecha: string;
    cantidadApostada: number;
    ganador: Participante;
    usuario: Usuario;
    cuota: number;
    evento: Evento;
    puntuacion1: number;
    puntuacion2: number;
    premio: number;
    premioPotencial: number;
    notificada: boolean;
}
  
export interface resultado {
    id: number;
    puntuacion1: number;
    puntuacion2: number;
    ganador: Participante;
}

export interface TipoSexo {
    id: number;
    descripcion: string;
}