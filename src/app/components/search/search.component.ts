import { Component, model } from '@angular/core';
import { debounce } from '../../utils';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styles: ``,
})
export class SearchComponent {
  search = model('');
  type = model('Movie');
  debouncedSearch = debounce((event: Event) => this.onSearch(event), 500);

  onSearch(event: Event) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    this.search.set(value);
  }

  onTypeChange(event: Event) {
    const element = event.target as HTMLSelectElement;
    const value = element.value;
    this.type.set(value);
  }
}
