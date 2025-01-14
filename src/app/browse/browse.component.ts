import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { BrowseService } from '../services/browse.service';
import { catchError } from 'rxjs';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { SearchComponent } from '../components/search/search.component';
import { CardComponent } from '../components/card/card.component';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse',
  imports: [PaginationComponent, SearchComponent, CardComponent, RouterLink],
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  browseService = inject(BrowseService);
  localStorageService = inject(LocalStorageService);
  page = signal(1);
  pageSize = signal(15);
  totalRecords = signal(30);
  records = signal<any[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal('');
  searchType = signal('');
  user: User;

  constructor() {
    this.user = this.getUser();
    effect(() => {
      // update when page and pageSize changes
      this.fetchRecords(
        this.page(),
        this.pageSize(),
        this.searchTerm(),
        this.searchType(),
      );
    });
  }

  ngOnInit(): void {
    this.fetchRecords(
      this.page(),
      this.pageSize(),
      this.searchType(),
      this.searchTerm(),
    );
  }

  getUser(): User {
    const token = this.localStorageService.getItem('accessToken')!;
    const decodedToken = jwtDecode(token);
    return decodedToken as User;
  }

  fetchRecords(
    page: number,
    pageSize: number,
    searchTerm: string,
    searchType: string,
  ) {
    this.loading.set(true);
    this.browseService
      .getTitlesPaged(page, pageSize, searchTerm, searchType)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      )
      .subscribe((response: GetTitlesPagedResponse) => {
        const { records, totalRecords } = response.data;
        this.records.set(records);
        this.totalRecords.set(totalRecords);
        this.loading.set(false);
      });
  }

  onSearchChange() {
    this.page.set(1);
  }

  onTypeChange() {
    this.page.set(1);
  }
}
