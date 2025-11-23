import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { AlertService } from '../../../../shared/alert.service';
import { GraficaService } from '../grafica.service';

@Component({
  standalone: true,
  selector: 'app-grafica-page',
  templateUrl: './grafica-page.component.html',
  imports: [CommonModule, FormsModule]
})
export class GraficaPageComponent {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  graficas: any[] = [];
  loading = false;
  buscado = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private service: GraficaService, private cdr: ChangeDetectorRef) {}

  async buscar() {
    if (!this.fechaInicio || !this.fechaFin) {
      AlertService.fire('Error', 'Debe seleccionar ambas fechas.', 'error');
      return;
    }
    this.loading = true;
    try {
      this.graficas = await this.service.graphic(this.usuarioId(), this.fechaInicio, this.fechaFin);
      this.buscado = true;

      setTimeout(() => {
        if (this.graficas.length > 0) {
          this.initChart(this.graficas);
        }
      });
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  initChart(data: any[]) {
    const ctx = this.chartRef?.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    const labels = data.map(d => d.tipoGasto);
    const presupuestado = data.map(d => d.presupuestado);
    const ejecutado = data.map(d => d.ejecutado);

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Presupuestado', data: presupuestado, backgroundColor: '#22c55e' },
          { label: 'Ejecutado', data: ejecutado, backgroundColor: '#f97316' }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: { x: { stacked: false }, y: { stacked: false } }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
