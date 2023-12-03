import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoBdComponent } from './mantenimiento-bd.component';

describe('MantenimientoBdComponent', () => {
  let component: MantenimientoBdComponent;
  let fixture: ComponentFixture<MantenimientoBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoBdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
