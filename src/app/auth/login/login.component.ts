import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RegistroComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  showRegistro = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  toggleRegistro() {
    this.showRegistro = !this.showRegistro;
  }

  async login() {
    this.errorMsg = '';

    try {
      const resp: any = await this.authService.login(this.email, this.password);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('nombre', resp.nombre);
      localStorage.setItem('usuarioId', resp.id);
      this.router.navigate(['/mantenimiento']);
    } catch (error: any) {
      this.errorMsg = error?.message || 'Error en el login';
      this.cd.markForCheck();
    }
  }
}
