export interface IDetalleOrden {
  id: number;
  orden_id: number;
  menu_id: number;
  precio_unitario: number;
  cantidad: number;
  total: number;
  //son solo para mostrar informacion
  nombre?: string;
}
