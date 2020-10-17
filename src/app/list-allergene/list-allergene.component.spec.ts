import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllergeneComponent } from './list-allergene.component';

describe('ListAllergeneComponent', () => {
  let component: ListAllergeneComponent;
  let fixture: ComponentFixture<ListAllergeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllergeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllergeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
