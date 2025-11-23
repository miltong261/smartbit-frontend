import { Injectable } from '@angular/core';
import { api } from '../../shared/api.service';
import { Presupuesto, PresupuestoCreatePayload, PresupuestoUpdatePayload } from './presupuesto.types';

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  private base = '/presupuestos-gasto';

  getAll(usuarioId: number, anio: number | null, mes: number | null, tipoGastoId: number | null): Promise<Presupuesto[]> {
    return api.get<Presupuesto[]>(`${this.base}/usuario/${usuarioId}`, {
      params: { anio, mes, tipoGastoId }
    });
  }

  getById(id: number): Promise<Presupuesto> {
    return api.get<Presupuesto>(`${this.base}/${id}`);
  }

  create(data: PresupuestoCreatePayload): Promise<any> {
    return api.post(this.base, data);
  }

  update(id: number, data: PresupuestoUpdatePayload): Promise<any> {
    return api.put(`${this.base}/${id}`, data);
  }
}
