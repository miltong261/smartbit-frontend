import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { DepositoPageComponent } from './features/deposito/pages/deposito-page.component';
import { FondoMonetarioPageComponent } from './features/fondo-monetario/pages/fondo-monetario-page.component';
import { GastoPageComponent } from './features/gasto/pages/gasto-page.component';
import { PresupuestoPageComponent } from './features/presupuesto/pages/presupuesto-page.component';
import { GraficaPageComponent } from './features/reporte/grafica/pages/grafica-page.component';
import { MovimientoPageComponent } from './features/reporte/movimiento/pages/movimiento-page.component';
import { TipoGastoPageComponent } from './features/tipo-gasto/pages/tipo-gasto-page.component';
import { MenuComponent } from './shared/menu/menu.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'mantenimiento',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tipo-gasto', component: TipoGastoPageComponent },
      { path: 'fondo-monetario', component: FondoMonetarioPageComponent },
    ]
  },
  {
    path: 'movimiento',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'presupuestos', component: PresupuestoPageComponent },
      { path: 'gastos', component: GastoPageComponent },
      { path: 'depositos', component: DepositoPageComponent }
    ]
  },
  {
    path: 'reporte',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'movimientos', component: MovimientoPageComponent },
      { path: 'graficas', component: GraficaPageComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
