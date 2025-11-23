import { Injectable } from '@angular/core';
import { api } from '../../../shared/api.service';
import { Movimiento } from './movimiento.types';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private base = '/reportes/movimientos';

  movements(usuarioId: number, fechaInicio: string | null, fechaFin: string | null, fondoMonetarioId: number | null): Promise<Movimiento> {
    return api.get<Movimiento>(`${this.base}/usuario/${usuarioId}`, {
      params: { fechaInicio, fechaFin, fondoMonetarioId }
    });
  }
}
