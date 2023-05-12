import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;
const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid || '';
  }

  logout() {
    localStorage.removeItem('token');
    if (!this.usuario.google) {
      this.router.navigateByUrl('/login');
    } else {
      google.accounts.id.revoke(this.usuario.email, () => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  validarToken(): Observable<boolean> {
    google.accounts.id.initialize({
      client_id:
        '138574778966-klieag8uh9077isuun884q72e96155dc.apps.googleusercontent.com',
    });

    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email, role, img = '', google, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', google, img, role, uid);

          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData);
  }

  actualizarPerfil(data: { email: string; nombre: string }) {
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
