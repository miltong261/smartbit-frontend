export interface Presupuesto {
  id: number;
  tipoGastoId: number;
  tipoGastoNombre: string | null;
  anio: number;
  mes: number;
  montoPresupuestado: number;
}

export interface PresupuestoCreatePayload {
  usuarioId: number;
  tipoGastoId: number;
  anio: number;
  mes: number;
  montoPresupuestado: number;
}

export interface PresupuestoUpdatePayload {
  montoPresupuestado: number;
}

export enum Meses {
  Enero = 1,
  Febrero,
  Marzo,
  Abril,
  Mayo,
  Junio,
  Julio,
  Agosto,
  Septiembre,
  Octubre,
  Noviembre,
  Diciembre
}

