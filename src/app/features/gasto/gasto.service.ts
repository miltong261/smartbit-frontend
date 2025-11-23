import { Injectable } from '@angular/core';
import { api } from '../../shared/api.service';
import { Gasto, GastoPayload } from './gasto.types';

@Injectable({ providedIn: 'root' })
export class GastoService {
  private base = '/gastos';

  getAll(usuarioId: number, fechaInicio: string | null, fechaFin: string | null, fondoMonetarioId: number | null): Promise<Gasto[]> {
    return api.get<Gasto[]>(`${this.base}/usuario/${usuarioId}`, {
      params: { fechaInicio, fechaFin, fondoMonetarioId }
    });
  }

  getById(id: number): Promise<Gasto> {
    return api.get<Gasto>(`${this.base}/${id}`);
  }

  create(data: GastoPayload): Promise<any> {
    return api.post(this.base, data);
  }
}
