import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/auth';

  constructor(private router: Router) {}

  login(email: string, password: string) {
    return api.post(`${this.baseUrl}/login`, { email, password });
  }

  registrar(nombre: string, email: string, password: string) {
    return api.post(`${this.baseUrl}/registrar`, { nombre, email, password });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
