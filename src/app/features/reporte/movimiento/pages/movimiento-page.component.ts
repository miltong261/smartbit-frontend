import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FondoMonetarioService } from '../../../fondo-monetario/fondo-monetario.service';
import { MovimientoService } from '../movimiento.service';
import { Movimiento } from '../movimiento.types';

@Component({
  standalone: true,
  selector: 'app-movimiento-page',
  templateUrl: './movimiento-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class MovimientoPageComponent {
  movimientos: Movimiento = { gastos: [], depositos: [] };

  fondosMonetarios: any[] = [];
  loading = false;
  buscado = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  fondoMonetarioId: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private fmService: FondoMonetarioService,
    private movimientoService: MovimientoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFondosMonetarios();
  }

  async loadFondosMonetarios() {
    this.loading = true;
    try {
      this.fondosMonetarios = await this.fmService.getAll(this.usuarioId());
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async buscar() {
    this.loading = true;
    try {
      this.movimientos = await this.movimientoService.movements(
        this.usuarioId(),
        this.fechaInicio,
        this.fechaFin,
        this.fondoMonetarioId
      );

      this.buscado = true;
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
