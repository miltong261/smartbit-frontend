export interface TipoGasto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}

export interface TipoGastoPayload {
  nombre: string;
  descripcion?: string | null;
}
