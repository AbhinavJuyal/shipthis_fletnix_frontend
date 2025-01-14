import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';
import { isTokenExpired } from '../utils';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(12)]),
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

  get ageError() {
    return this.form.get('age')?.invalid && this.form.get('age')?.touched; // Use safeGet for optional chaining
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.authService
        // @ts-ignore
        .signup(formData)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          }),
        )
        .subscribe((response: any) => {
          console.log(response, 'response'); // const { records, totalRecords } = response.data;
        });
    }
  }
}
