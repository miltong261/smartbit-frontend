import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FondoMonetarioService } from '../../fondo-monetario/fondo-monetario.service';
import { DepositoService } from '../deposito.service';
import { DepositoModalComponent } from '../modal/deposito-modal.component';

@Component({
  standalone: true,
  selector: 'app-deposito-page',
  templateUrl: './deposito-page.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class DepositoPageComponent {
  depositos: any[] = [];
  fondosMonetarios: any[] = [];
  loading = false;
  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  fondoMonetarioId: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private fmService: FondoMonetarioService,
    private depositoService: DepositoService,
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
      this.depositos = await this.depositoService.getAll(
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
    const dialogRef = this.dialog.open(DepositoModalComponent, {
      width: '500px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(async val => {
      if (val) await this.buscar();
    });
  }
}
