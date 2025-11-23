export interface GastoDetalle {

}

export interface Gasto {
  id: number;
  usuarioId: number;
  fondoMonetarioId: number;
  fondoMonetarioNombre: string;
  fecha: string;
  nombreComercio: string;
  observaciones: string;
  tipoDocumento: number;
  numeroDocumento: string;
  total: number;
  detalles: GastoDetalle[];
}

export interface Deposito {
  id: number;
  fecha: string;
  monto: number;
  fondoMonetarioId: number;
  fondoMonetarioNombre: string;
  usuarioId: number;
}

export interface Movimiento {
  gastos: Gasto[];
  depositos: Deposito[];
}
