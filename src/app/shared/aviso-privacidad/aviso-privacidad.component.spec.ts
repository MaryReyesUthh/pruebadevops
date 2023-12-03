import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPrivacidadComponent } from './aviso-privacidad.component';

describe('AvisoPrivacidadComponent', () => {
  let component: AvisoPrivacidadComponent;
  let fixture: ComponentFixture<AvisoPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoPrivacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
