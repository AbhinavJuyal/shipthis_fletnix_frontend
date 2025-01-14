import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TagComponent],
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent {
  record = input<RecordDetails | null>();
}
