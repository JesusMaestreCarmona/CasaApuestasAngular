import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposApuestasComponent } from './tipos-apuestas.component';

describe('TiposApuestasComponent', () => {
  let component: TiposApuestasComponent;
  let fixture: ComponentFixture<TiposApuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposApuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposApuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
