import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByIdComponent } from './browse-by-id.component';

describe('BrowseByIdComponent', () => {
  let component: BrowseByIdComponent;
  let fixture: ComponentFixture<BrowseByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
