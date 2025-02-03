export interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  estado: Estado;
  creacion: string;
  actualizacion: string;
  proyecto_id: string;
}

export enum Estado {
  Pendiente = 'pendiente',
  Progreso = 'en-progreso',
  Completada = 'completada'
}
