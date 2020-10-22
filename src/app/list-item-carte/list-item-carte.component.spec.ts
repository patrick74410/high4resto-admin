import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemCarteComponent } from './list-item-carte.component';

describe('ListItemCarteComponent', () => {
  let component: ListItemCarteComponent;
  let fixture: ComponentFixture<ListItemCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
