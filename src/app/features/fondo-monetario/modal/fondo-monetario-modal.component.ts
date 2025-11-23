import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/alert.service';
import { FondoMonetarioService } from '../fondo-monetario.service';
import { FondoMonetario, FondoMonetarioCreatePayload, FondoMonetarioUpdatePayload } from '../fondo-monetario.types';

@Component({
  standalone: true,
  selector: 'app-fondo-monetario-modal',
  templateUrl: './fondo-monetario-modal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class FondoMonetarioModalComponent {

  form!: FormGroup;
  loading = false;
  esEdicion = false;

  tipos = [
    { value: 1, label: 'Cuenta Bancaria' },
    { value: 2, label: 'Caja Menuda' }
  ];

  usuarioId = signal(Number(localStorage.getItem('usuarioId')) || 0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: number },
    public dialogRef: MatDialogRef<FondoMonetarioModalComponent>,
    private service: FondoMonetarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: [1, Validators.required],
      saldoInicial: !this.esEdicion ? [0, Validators.required] : []
    });
  }

  async ngOnInit() {
    if (this.data.id) {
      this.esEdicion = true;

      await this.getById();
    }
  }

  async getById() {
    this.loading = true;
    try {
      const res: FondoMonetario = await this.service.getById(this.data.id!);
      this.form.patchValue(res);
    } finally {
      this.loading = false;
    }
  }

  async create() {
     if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    try {
      if (this.esEdicion) {
          const payload: FondoMonetarioUpdatePayload = {
          nombre: this.form.value.nombre,
          tipo: Number(this.form.value.tipo),
        };

        await this.service.update(this.data.id!, payload);
      } else {
        const payload: FondoMonetarioCreatePayload = {
          nombre: this.form.value.nombre,
          tipo: Number(this.form.value.tipo),
          saldoInicial: this.form.value.saldoInicial,
          usuarioId: this.usuarioId(),
        };

        await this.service.create(payload);
      }

      this.dialogRef.close(true);

      await AlertService.fire(
        'Éxito',
        `Fondo monetario ${this.esEdicion ? 'actualizado' : 'creado'} correctamente`,
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
