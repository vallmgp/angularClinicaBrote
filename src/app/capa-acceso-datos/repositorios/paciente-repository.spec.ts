import { TestBed } from '@angular/core/testing';
import { PacienteRepository } from './paciente-repository';

describe('PacienteRepository', () => {
  let service: PacienteRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
