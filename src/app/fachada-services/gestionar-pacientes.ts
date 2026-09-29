import { Injectable, inject } from '@angular/core';
import { Paciente } from '../capa-acceso-datos/entidades/paciente';
import { PacienteRepository } from '../capa-acceso-datos/repositorios/paciente-repository';

// Fachada: es lo único que usa la capa de presentación para
// trabajar con pacientes. Por dentro habla con el repositorio.
@Injectable({
  providedIn: 'root',
})
export class GestionarPacientes {
  private repoPaciente = inject(PacienteRepository);

  registrarPaciente(
    nombreCompleto: string,
    correo: string,
    telefono: string,
    tipoDocumento: string,
    numeroDocumento: string,
    fechaNacimiento: string,
    genero: string
  ): Paciente {
    const id = this.repoPaciente.siguienteId();
    const paciente = new Paciente(id, nombreCompleto, correo, telefono,
      tipoDocumento, numeroDocumento, fechaNacimiento, genero);
    this.repoPaciente.agregar(paciente);
    return paciente;
  }

  listarPacientes(): Paciente[] {
    return this.repoPaciente.obtenerTodos();
  }

  buscarPaciente(id: number): Paciente | undefined {
    return this.repoPaciente.buscarPorId(id);
  }

  buscarPacientePorCorreo(correo: string): Paciente | undefined {
    return this.repoPaciente.buscarPorCorreo(correo);
  }
}
