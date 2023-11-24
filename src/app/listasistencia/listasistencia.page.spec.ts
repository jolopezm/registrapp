import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListasistenciaPage } from './listasistencia.page';

describe('ListasistenciaPage', () => {
  let component: ListasistenciaPage;
  let fixture: ComponentFixture<ListasistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
