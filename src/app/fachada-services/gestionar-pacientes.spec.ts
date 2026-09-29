import { TestBed } from '@angular/core/testing';
import { GestionarPacientes } from './gestionar-pacientes';

describe('GestionarPacientes', () => {
  let service: GestionarPacientes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarPacientes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
