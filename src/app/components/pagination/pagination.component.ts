import { Component, computed, input, model } from '@angular/core';
import { checkIfButtonElement } from '../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styles: ``,
})
export class PaginationComponent {
  page = model(1);
  pageSize = model(15);
  totalRecords = input(30);
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));
  showPages = computed(() => {
    const page = this.page();
    const section = Math.ceil(this.page() / 3);
    return new Array(3).fill(0).map((_, i: number) => i + (3 * section - 2));
  });
  pageSizeOptions = [15, 20, 25, 30];

  onPageSizeChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.pageSize.set(Number(element.value));
  }

  onPageChange(event: MouseEvent) {
    const element = event.target;
    if (!checkIfButtonElement(element)) return;
    const id = element.id;
    if (!id.includes('pg-button-')) return;
    const pageNumber = Number(id.replace('pg-button-', ''));
    if (Number.isNaN(pageNumber)) return;
    this.page.set(Number(pageNumber));
  }

  onPrev() {
    if (this.page() === 1) return;
    this.page.update((value) => value - 1);
  }

  onNext() {
    if (this.page() === this.totalPages()) return;
    this.page.update((value) => value + 1);
  }
}
