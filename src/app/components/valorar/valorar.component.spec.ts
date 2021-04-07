import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorarComponent } from './valorar.component';

describe('ValorarComponent', () => {
  let component: ValorarComponent;
  let fixture: ComponentFixture<ValorarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
