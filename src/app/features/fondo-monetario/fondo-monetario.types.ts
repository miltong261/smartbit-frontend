export interface FondoMonetario {
  id: number;
  nombre: string;
  saldoInicial: number;
  saldoActual: number;
  usuarioId: number;
  activo: boolean;
}

export interface FondoMonetarioCreatePayload {
  nombre: string;
  tipo: number;
  saldoInicial: number;
  usuarioId: number;
}

export interface FondoMonetarioUpdatePayload {
  nombre?: string;
  tipo?: number;
}
