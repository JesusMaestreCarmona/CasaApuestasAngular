import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaApuestaComponent } from './ventana-apuesta.component';

describe('VentanaApuestaComponent', () => {
  let component: VentanaApuestaComponent;
  let fixture: ComponentFixture<VentanaApuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaApuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaApuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
