import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TipoGastoModalComponent } from '../modal/tipo-gasto-modal.component';
import { TipoGastoService } from '../tipo-gasto.service';

@Component({
  standalone: true,
  selector: 'app-tipo-gasto-page',
  templateUrl: './tipo-gasto-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class TipoGastoPageComponent {
  tiposGasto: any[] = [];
  loading = false;

  constructor(
    private service: TipoGastoService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.loading = true;
    try {
      this.tiposGasto = await this.service.getAll();
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  abrirModal(id?: number) {
    const dialogRef = this.dialog.open(TipoGastoModalComponent, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) await this.getAll();
    });
  }

  async changeStatus(id: number) {
    await this.service.handleStatus(id);
    await this.getAll();
  }
}
