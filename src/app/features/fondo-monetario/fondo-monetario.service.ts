import { Injectable } from '@angular/core';
import { api } from '../../shared/api.service';
import { FondoMonetario, FondoMonetarioCreatePayload, FondoMonetarioUpdatePayload } from './fondo-monetario.types';

@Injectable({ providedIn: 'root' })
export class FondoMonetarioService {
  private base = '/fondos-monetarios';

  getAll(usuarioId: number, activo?: boolean): Promise<FondoMonetario[]> {
    const url = activo ? `${this.base}/usuario/${usuarioId}?activo=true` : `${this.base}/usuario/${usuarioId}`;
    return api.get<FondoMonetario[]>(url);
  }

  getById(id: number): Promise<FondoMonetario> {
    return api.get<FondoMonetario>(`${this.base}/${id}`);
  }

  create(data: FondoMonetarioCreatePayload): Promise<any> {
    return api.post(this.base, data);
  }

  update(id: number, data: FondoMonetarioUpdatePayload): Promise<any> {
    return api.put(`${this.base}/${id}`, data);
  }

  handleStatus(id: number): Promise<any> {
    return api.put(`${this.base}/handle-status/${id}`, {});
  }
}
