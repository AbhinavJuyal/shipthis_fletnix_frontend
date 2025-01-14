import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  http = inject(HttpClient);
  localStorageService = inject(LocalStorageService);

  constructor() {}

  getTitlesPaged(
    page: number = 1,
    pageSize: number = 15,
    searchTerm: string = '',
    searchType: string = 'Movie',
  ) {
    const url = `${environment.apiUrl}/browse?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&searchType=${searchType}`;
    const token = this.localStorageService.getItem('accessToken');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<GetTitlesPagedResponse>(url, { headers: httpHeaders });
  }

  getTitleById(id: string) {
    const url = `${environment.apiUrl}/browse/${id}`;
    const token = this.localStorageService.getItem('accessToken');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<GetTitleByIdResponse>(url, { headers: httpHeaders });
  }
}
