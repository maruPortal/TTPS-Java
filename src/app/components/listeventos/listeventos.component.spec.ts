import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeventosComponent } from './listeventos.component';

describe('ListeventosComponent', () => {
  let component: ListeventosComponent;
  let fixture: ComponentFixture<ListeventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
