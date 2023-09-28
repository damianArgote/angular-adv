import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
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

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
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

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario?.role as string,
    };

    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, this.headers);
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

  cargarUsuarios(desde: number = 0) {
    const url = `${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((respuesta) => {
        const usuarios = respuesta.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.google,
              user.img,
              user.role,
              user.uid
            )
        );

        return {
          total: respuesta.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${baseUrl}/usuarios/${usuario.uid}`;
    return this.http.delete<CargarUsuario>(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${baseUrl}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
