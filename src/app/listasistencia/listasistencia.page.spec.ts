import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListAsistenciaPage } from './listasistencia.page';

describe('ListasistenciaPage', () => {
  let component: ListAsistenciaPage;
  let fixture: ComponentFixture<ListAsistenciaPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ListAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
