import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/alert.service';
import { TipoGastoService } from '../tipo-gasto.service';
import { TipoGasto, TipoGastoPayload } from '../tipo-gasto.types';

@Component({
  standalone: true,
  selector: 'app-tipo-gasto-modal',
  templateUrl: './tipo-gasto-modal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class TipoGastoModalComponent {

  form!: FormGroup;
  loading = false;
  esEdicion = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: number },
    public dialogRef: MatDialogRef<TipoGastoModalComponent>,
    private service: TipoGastoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
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
      const res: TipoGasto = await this.service.getById(this.data.id!);
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

    const payload : TipoGastoPayload = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion || null,
    };

    try {
      if (this.esEdicion) {
        await this.service.update(this.data.id!, payload);
      } else {
        await this.service.create(payload);
      }

      this.dialogRef.close(true);

      await AlertService.fire(
        'Éxito',
        `Tipo de gasto ${this.esEdicion ? 'actualizado' : 'creado'} correctamente`,
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
