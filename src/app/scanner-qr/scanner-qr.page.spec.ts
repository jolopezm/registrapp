import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScannerQRPage } from './scanner-qr.page';

describe('ScannerQRPage', () => {
  let component: ScannerQRPage;
  let fixture: ComponentFixture<ScannerQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScannerQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
