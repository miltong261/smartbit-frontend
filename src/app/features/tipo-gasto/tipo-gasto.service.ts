import { Injectable } from '@angular/core';
import { api } from '../../shared/api.service';
import { TipoGasto, TipoGastoPayload } from './tipo-gasto.types';

@Injectable({ providedIn: 'root' })
export class TipoGastoService {

  private base = '/tipos-gasto';

  getAll(activo?: boolean): Promise<TipoGasto[]> {
    const url = activo ? `${this.base}?activo=true` : this.base;
    return api.get<TipoGasto[]>(url);
  }

  getById(id: number): Promise<TipoGasto> {
    return api.get<TipoGasto>(`${this.base}/${id}`);
  }

  create(data: TipoGastoPayload): Promise<any> {
    return api.post(this.base, data);
  }

  update(id: number, data: TipoGastoPayload): Promise<any> {
    return api.put(`${this.base}/${id}`, data);
  }

  handleStatus(id: number): Promise<any> {
    return api.put(`${this.base}/handle-status/${id}`, {});
  }
}
