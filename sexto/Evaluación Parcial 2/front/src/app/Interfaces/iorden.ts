export interface IOrden {
  id: number;
  fecha: string;
  total: number;
  cliente_id: number;

  //son solo para mostrar informacion
  nombre?: string;
}
