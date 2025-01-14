import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  localStorageService = inject(LocalStorageService);
  user: User;

  constructor(private router: Router) {
    this.user = this.getUser();
  }

  getUser(): User {
    const token = this.localStorageService.getItem('accessToken')!;
    const decodedToken = jwtDecode(token);
    return decodedToken as User;
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
