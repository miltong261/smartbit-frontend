import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/alert.service';
import { FondoMonetarioService } from '../../fondo-monetario/fondo-monetario.service';
import { DepositoService } from '../deposito.service';
import { DepositoPayload } from '../deposito.types';

@Component({
  standalone: true,
  selector: 'app-deposito-modal',
  templateUrl: './deposito-modal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class DepositoModalComponent {

  form!: FormGroup;
  loading = false;
  esEdicion = false;
  fondosMonetarios: any[] = [];

  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: number },
    public dialogRef: MatDialogRef<DepositoModalComponent>,
    private fmService: FondoMonetarioService,
    private depositoService: DepositoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0.01)]],
      fondoMonetarioId: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getFmAll();
  }

  async getFmAll() {
    this.loading = true;
    try {
      this.fondosMonetarios = await this.fmService.getAll(this.usuarioId(), true);
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

    const payload : DepositoPayload = {
      fecha: this.form.value.fecha,
      monto: this.form.value.monto,
      fondoMonetarioId: this.form.value.fondoMonetarioId,
      usuarioId: this.usuarioId(),
    }

    try {
      await this.depositoService.create(payload);

      this.dialogRef.close(true);

      await AlertService.fire(
        'Éxito',
        `Deposito creado correctamente`,
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
