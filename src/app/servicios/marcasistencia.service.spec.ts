import { TestBed } from '@angular/core/testing';

import { MarcasistenciaService } from './marcasistencia.service';

describe('MarcasistenciaService', () => {
  let service: MarcasistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcasistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
