import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/alert.service';
import { TipoGastoService } from '../../tipo-gasto/tipo-gasto.service';
import { PresupuestoService } from '../presupuesto.service';
import { Meses, Presupuesto, PresupuestoCreatePayload, PresupuestoUpdatePayload } from '../presupuesto.types';

@Component({
  standalone: true,
  selector: 'app-presupuesto-modal',
  templateUrl: './presupuesto-modal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class PresupuestoModalComponent {

  form!: FormGroup;
  loading = false;
  tipoGastos: any[] = [];
  esEdicion = false;
  errorMsg = '';

  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  meses = Object.entries(Meses)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ id: value as number, nombre: key }));

  anios = Array.from({ length: 2030 - 2015 + 1 }, (_, i) => 2015 + i);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: number },
    public dialogRef: MatDialogRef<PresupuestoModalComponent>,
    private tgService: TipoGastoService,
    private presupuestoService: PresupuestoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      tipoGastoId: !this.esEdicion ? [null, Validators.required] : [],
      anio: !this.esEdicion ? [null, Validators.required] : [],
      mes: !this.esEdicion ? [null, Validators.required] : [],
      montoPresupuestado: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async ngOnInit() {
    if (this.data.id) {
      this.esEdicion = true;

      await this.getById();
    } else {
      await this.getTgAll();
    }
  }

  async getById() {
    this.loading = true;
    try {
      const res: Presupuesto = await this.presupuestoService.getById(this.data.id!);
      this.form.patchValue(res);
    } finally {
      this.loading = false;
    }
  }

  async getTgAll() {
    this.loading = true;
    try {
      this.tipoGastos = await this.tgService.getAll(true);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload: PresupuestoCreatePayload = {
      usuarioId: this.usuarioId(),
      tipoGastoId: this.form.value.tipoGastoId,
      anio: this.form.value.anio,
      mes: this.form.value.mes,
      montoPresupuestado: this.form.value.montoPresupuestado,
    };

    try {
      if (this.esEdicion) {
        const payload : PresupuestoUpdatePayload = {
          montoPresupuestado: this.form.value.montoPresupuestado,
        };

        await this.presupuestoService.update(this.data.id!, payload);
      } else {
        const payload: PresupuestoCreatePayload = {
          usuarioId: this.usuarioId(),
          tipoGastoId: this.form.value.tipoGastoId,
          anio: this.form.value.anio,
          mes: this.form.value.mes,
          montoPresupuestado: this.form.value.montoPresupuestado,
        };

        await this.presupuestoService.create(payload);
      }

      this.dialogRef.close(true);

      await AlertService.fire(
        'Éxito',
        `Presupuesto ${this.esEdicion ? 'actualizado' : 'creado'} correctamente`,
        'success'
      );
    } catch (error: any) {
      await AlertService.fire(
        'Error',
        error?.message || 'Ocurrió un error al registrar',
        'error'
      );
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
