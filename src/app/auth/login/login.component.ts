import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: [localStorage.getItem('email') ? true : false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '138574778966-klieag8uh9077isuun884q72e96155dc.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential).subscribe(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

  login() {
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        } else {
          localStorage.removeItem('email');
        }
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
