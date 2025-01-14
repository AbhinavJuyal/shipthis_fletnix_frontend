import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { isTokenExpired } from '../utils';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (isTokenExpired(this.localStorageService)) return;
    this.router.navigate(['/browse']);
  }

  get emailError() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordError() {
    return (
      this.form.get('password')?.invalid && this.form.get('password')?.touched
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.authService
        // @ts-ignore
        .login(formData)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          }),
        )
        .subscribe((response: any) => {
          const { data } = response;
          const { accessToken } = data;

          this.localStorageService.setItem('accessToken', accessToken);
          this.router.navigate(['/browse']);
        });
    }
  }
}
