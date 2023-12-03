import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCerrarSesionComponent } from './modal-cerrar-sesion.component';

describe('ModalCerrarSesionComponent', () => {
  let component: ModalCerrarSesionComponent;
  let fixture: ComponentFixture<ModalCerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCerrarSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
