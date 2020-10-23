import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionsItemComponent } from './list-options-item.component';

describe('ListOptionsItemComponent', () => {
  let component: ListOptionsItemComponent;
  let fixture: ComponentFixture<ListOptionsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOptionsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOptionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
