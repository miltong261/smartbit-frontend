export interface Deposito {
  id: number;
  fecha: string;
  Monto: number;
  fondoMonetarioId: number;
  fondoMonetarioNombre: string | null;
  usuarioId: number;
}

export interface DepositoPayload {
  fecha: string;
  monto: number;
  fondoMonetarioId: number;
  usuarioId: number;
}
