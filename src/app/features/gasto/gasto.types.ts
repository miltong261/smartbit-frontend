export interface GastoDetalleRespuesta {
  tipoGastoId: number;
  nombreTipoGasto: string;
  monto: number;
}

export interface Gasto {
  id: number;
  usuarioId: number;
  fondoMonetarioId: number;
  fondoMonetarioNombre: string | null;
  fecha: string;
  nombreComercio: string;
  observaciones?: string | null;
  tipoDocumento: number;
  numeroDocumento?: string | null;
  total: number;
  detalles: GastoDetalleRespuesta[];
}

export interface GastoDetallePayload {
  tipoGastoId: number;
  monto: number;
}

export interface GastoPayload {
  usuarioId: number;
  fondoMonetarioId: number;
  fecha: string;
  nombreComercio: string;
  observaciones?: string | null;
  tipoDocumento: number;
  numeroDocumento?: string | null;
  detalles: GastoDetallePayload[];
}

export enum TipoDocumento {
  Comprobante = 1,
  Factura = 2,
  Otro = 3
}

export const TipoDocumentoText: Record<TipoDocumento, string> = {
  [TipoDocumento.Comprobante]: 'Comprobante',
  [TipoDocumento.Factura]: 'Factura',
  [TipoDocumento.Otro]: 'Otro'
};


