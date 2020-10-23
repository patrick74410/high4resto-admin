import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTvaComponent } from './list-tva.component';

describe('ListTvaComponent', () => {
  let component: ListTvaComponent;
  let fixture: ComponentFixture<ListTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
