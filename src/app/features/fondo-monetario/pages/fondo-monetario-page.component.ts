import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FondoMonetarioService } from '../fondo-monetario.service';
import { FondoMonetarioModalComponent } from '../modal/fondo-monetario-modal.component';

@Component({
  standalone: true,
  selector: 'app-fondo-monetario-page',
  templateUrl: './fondo-monetario-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class FondoMonetarioPageComponent {
  fondosMonetarios: any[] = [];
  loading = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  constructor(
    private service: FondoMonetarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.loading = true;
    try {
      this.fondosMonetarios = await this.service.getAll(this.usuarioId());
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  abrirModal(id?: number) {
    const dialogRef = this.dialog.open(FondoMonetarioModalComponent, {
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
