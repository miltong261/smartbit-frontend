import { Injectable } from '@angular/core';
import { api } from '../../shared/api.service';
import { Deposito, DepositoPayload } from './deposito.types';

@Injectable({ providedIn: 'root' })
export class DepositoService {
  private base = '/depositos';

  getAll(usuarioId: number, fechaInicio: string | null, fechaFin: string | null, fondoMonetarioId: number | null): Promise<Deposito[]> {
    return api.get<Deposito[]>(`${this.base}/usuario/${usuarioId}`, {
      params: { fechaInicio, fechaFin, fondoMonetarioId }
    });
  }

  getById(id: number): Promise<Deposito> {
    return api.get<Deposito>(`${this.base}/${id}`);
  }

  create(data: DepositoPayload): Promise<any> {
    return api.post(this.base, data);
  }
}
