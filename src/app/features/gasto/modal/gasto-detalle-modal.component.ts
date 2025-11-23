import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GastoService } from '../gasto.service';
import { Gasto, TipoDocumento, TipoDocumentoText } from '../gasto.types';

@Component({
  standalone: true,
  selector: 'app-gasto-detalle-modal',
  templateUrl: './gasto-detalle-modal.component.html',
  imports: [CommonModule, MatDialogModule]
})
export class GastoDetalleModalComponent {

  gasto: Gasto | null = null;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<GastoDetalleModalComponent>,
    private service: GastoService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getById();
  }

  async getById() {
    this.loading = true;
    try {
      this.gasto = await this.service.getById(this.data.id);
      this.cdr.detectChanges();
    } finally {
      this.loading = false;
    }
  }

  getTipoDocumentoText(tipo: number): string {
    return TipoDocumentoText[tipo as TipoDocumento] || 'Desconocido';
  }
}
