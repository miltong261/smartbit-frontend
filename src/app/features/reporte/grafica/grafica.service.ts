import { Injectable } from '@angular/core';
import { api } from '../../../shared/api.service';
import { Grafica } from './grafica.types';

@Injectable({ providedIn: 'root' })
export class GraficaService {
  private base = '/reportes/grafica';

  graphic(usuarioId: number, fechaInicio: string | null, fechaFin: string | null): Promise<Grafica[]> {
    return api.get<Grafica[]>(`${this.base}/usuario/${usuarioId}`, {
      params: { fechaInicio, fechaFin }
    });
  }
}
