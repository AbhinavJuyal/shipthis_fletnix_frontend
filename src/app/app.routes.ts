import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowseComponent } from './browse/browse.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { BrowseByIdComponent } from './browse-by-id/browse-by-id.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'browse/:id',
    component: BrowseByIdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
];
