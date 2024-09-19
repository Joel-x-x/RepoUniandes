export interface IReporte {
  inicio: string;
  fin: string;
}

export interface IReporteResponse {
  id: number;
  fecha: string;
  total: number;
  nombre: string;
  apellido: string;  
}