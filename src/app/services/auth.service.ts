import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  signup(formData: { email: string; password: string; age: number }) {
    const url = `${environment.apiUrl}/auth/signup`;
    return this.http.post(url, formData);
  }

  login(formData: { email: string; password: string }) {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post(url, formData);
  }
  constructor() {}
}
