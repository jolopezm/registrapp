import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservarCitaPage } from './reservar-cita.page';

describe('ReservarCitaPage', () => {
  let component: ReservarCitaPage;
  let fixture: ComponentFixture<ReservarCitaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservarCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
