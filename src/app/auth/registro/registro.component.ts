import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  @Output() afterRegister = new EventEmitter<void>();

  nombre = '';
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) {}

  async registrar() {
    this.errorMsg = '';
    this.successMsg = '';

    try {
      await this.authService.registrar(this.nombre, this.email, this.password);
      this.successMsg = 'Ya puede hacer login con tus credenciales.';

      this.cd.markForCheck();

      setTimeout(() => {
        this.afterRegister.emit();
      }, 2000);
    } catch (error: any) {
      this.errorMsg = error?.message || 'Error al registrar';
      this.cd.markForCheck();
    }
  }
}
