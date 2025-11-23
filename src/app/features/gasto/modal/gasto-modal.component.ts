import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/alert.service';
import { FondoMonetarioService } from '../../fondo-monetario/fondo-monetario.service';
import { TipoGastoService } from '../../tipo-gasto/tipo-gasto.service';
import { GastoService } from '../gasto.service';
import { GastoDetallePayload, GastoPayload } from '../gasto.types';

@Component({
  standalone: true,
  selector: 'app-gasto-modal',
  templateUrl: './gasto-modal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ]
})
export class GastoModalComponent {

  form!: FormGroup;
  loading = false;
  fondosMonetarios: any[] = [];
  tiposGasto: any[] = [];

  detalle: GastoDetallePayload = { tipoGastoId: 0, monto: 0 };
  detalles: GastoPayload['detalles'] = [];

  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: number },
    public dialogRef: MatDialogRef<GastoModalComponent>,
    private fmService: FondoMonetarioService,
    private tgService: TipoGastoService,
    private gastoService: GastoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      fondoMonetarioId: [null, Validators.required],
      fecha: [null, Validators.required],
      nombreComercio: [null, Validators.required],
      observaciones: [null],
      tipoDocumento: [null, Validators.required],
      numeroDocumento: [null],
      detalles: [[], Validators.required]
    });
  }

  async ngOnInit() {
    await this.getResources();
  }

  async getResources() {
    this.loading = true;
    try {
      this.fondosMonetarios = await this.fmService.getAll(this.usuarioId(), true);
      this.tiposGasto = await this.tgService.getAll(true);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  agregarDetalle() {
    if (!this.detalle.tipoGastoId || !this.detalle.monto || this.detalle.monto <= 0) {
      AlertService.fire('Error', 'Seleccione un tipo de gasto y un monto válido', 'error');
      return;
    }

    if (this.detalles.some(d => d.tipoGastoId === this.detalle.tipoGastoId)) {
      AlertService.fire('Error', 'Este tipo de gasto ya está en la lista', 'error');
      return;
    }

    this.detalles.push({ ...this.detalle });
    this.detalle = { tipoGastoId: 0, monto: 0 };
    this.form.controls['detalles'].setValue(this.detalles);
  }

  quitarDetalle(index: number) {
    this.detalles.splice(index, 1);
    this.form.controls['detalles'].setValue(this.detalles);
  }

  getNombreTipoGasto(tipoGastoId: number): string {
    const tg = this.tiposGasto.find(t => t.id === Number(tipoGastoId));
    return tg ? tg.nombre : 'Desconocido';
  }

  async create() {
    if (this.form.invalid || this.detalles.length === 0) {
      this.form.markAllAsTouched();
      AlertService.fire('Error', 'Debe completar el formulario y agregar al menos un detalle', 'error');
      return;
    }

    this.loading = true;

    const payload: GastoPayload = {
      usuarioId: this.usuarioId(),
      fondoMonetarioId: Number(this.form.value.fondoMonetarioId),
      fecha: this.form.value.fecha,
      nombreComercio: this.form.value.nombreComercio,
      observaciones: this.form.value.observaciones,
      tipoDocumento: Number(this.form.value.tipoDocumento),
      numeroDocumento: this.form.value.numeroDocumento,
      detalles: this.detalles
    };

    try {
      await this.gastoService.create(payload);
      this.dialogRef.close(true);
      await AlertService.fire('Éxito', 'Gasto creado correctamente', 'success');
    } catch (error: any) {
      await AlertService.fire('Error', error?.message || 'Ocurrió un error al registrar', 'error', 5000, '1000px');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
