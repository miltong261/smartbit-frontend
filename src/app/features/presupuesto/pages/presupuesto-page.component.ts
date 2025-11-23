import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TipoGastoService } from '../../tipo-gasto/tipo-gasto.service';
import { PresupuestoModalComponent } from '../modal/presupuesto-modal.component';
import { PresupuestoService } from '../presupuesto.service';
import { Meses } from '../presupuesto.types';

@Component({
  standalone: true,
  selector: 'app-presupuesto-page',
  templateUrl: './presupuesto-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class PresupuestoPageComponent {
  presupuestos: any[] = [];
  tipoGastos: any[] = [];
  loading = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  tipoGastoId: number | null = null;
  mes: number | null = null;
  anio: number | null = null;

  meses = Object.entries(Meses)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ id: value as number, nombre: key }));

  anios = Array.from({ length: 2030 - 2015 + 1 }, (_, i) => 2015 + i);

  constructor(
    private tgService: TipoGastoService,
    private presupuestoService: PresupuestoService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTipoGastos();
    this.buscar();
  }

  async loadTipoGastos() {
    this.loading = true;
    try {
      this.tipoGastos = await this.tgService.getAll();
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async buscar() {
    this.loading = true;
    try {
      this.presupuestos = await this.presupuestoService.getAll(
        this.usuarioId(),
        this.anio,
        this.mes,
        this.tipoGastoId
      );
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  abrirModal(id?: number) {
    const dialogRef = this.dialog.open(PresupuestoModalComponent, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) await this.buscar();
    });
  }

  getNombreMes(mesNumero: number | null): string {
    if (mesNumero === null) return 'Desconocido';
    const mes = this.meses.find(m => m.id === mesNumero);
    return mes ? mes.nombre : 'Desconocido';
  }
}
