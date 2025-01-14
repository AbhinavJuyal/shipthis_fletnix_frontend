import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrowseService } from '../services/browse.service';
import { catchError } from 'rxjs';
import { TagComponent } from '../components/tag/tag.component';

@Component({
  selector: 'app-browse-by-id',
  imports: [TagComponent, RouterLink],
  templateUrl: './browse-by-id.component.html',
  styleUrl: './browse-by-id.component.css',
})
export class BrowseByIdComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  browseService = inject(BrowseService);
  record = signal<RecordDetails | null>(null);
  loading = signal<boolean>(true);

  constructor() {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.browseService
      .getTitleById(id)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
      )
      .subscribe((response: GetTitleByIdResponse) => {
        this.record.set(response.data);
        this.loading.set(false);
      });
  }
}
