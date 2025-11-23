import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FondoMonetarioService } from '../../fondo-monetario/fondo-monetario.service';
import { GastoService } from '../gasto.service';
import { TipoDocumento, TipoDocumentoText } from '../gasto.types';
import { GastoDetalleModalComponent } from '../modal/gasto-detalle-modal.component';
import { GastoModalComponent } from '../modal/gasto-modal.component';

@Component({
  standalone: true,
  selector: 'app-gasto-page',
  templateUrl: './gasto-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class GastoPageComponent {
  gastos: any[] = [];
  fondosMonetarios: any[] = [];
  loading = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  fondoMonetarioId: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  getTipoDocumentoText(tipo: number): string {
    return TipoDocumentoText[tipo as TipoDocumento] || 'Desconocido';
  }

  constructor(
    private fmService: FondoMonetarioService,
    private gastoService: GastoService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFondosMonetarios();
    this.buscar();
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
      this.gastos = await this.gastoService.getAll(
        this.usuarioId(),
        this.fechaInicio,
        this.fechaFin,
        this.fondoMonetarioId
      );
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  abrirModal() {
    const dialogRef = this.dialog.open(GastoModalComponent, {
      width: '900px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) await this.buscar();
    });
  }

  abrirDetalle(id: number) {
    const dialogRef = this.dialog.open(GastoDetalleModalComponent, {
      width: '900px',
      data: { id },
    });
  }
}
