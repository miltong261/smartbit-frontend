import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',

})
export class MenuComponent {
  nombre = signal(localStorage.getItem('nombre') || '');

  sidebarItems = [
    {
      label: 'Mantenimientos',
      children: [
        { label: 'Tipo de gastos', route: '/mantenimiento/tipo-gasto' },
        { label: 'Fondos monetarios', route: '/mantenimiento/fondo-monetario' }
      ]
    },
    {
      label: 'Movimientos',
      children: [
        { label: 'Presupuesto', route: '/movimiento/presupuestos' },
        { label: 'Gastos', route: '/movimiento/gastos' },
        { label: 'Depósitos', route: '/movimiento/depositos' }
      ]
    },
    {
      label: 'Reportes',
      children: [
        { label: 'Movimientos', route: '/reporte/movimientos' },
        { label: 'Gráfica', route: '/reporte/graficas' }
      ]
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  isActive(route: string) {
    return this.router.url === route;
  }
}
