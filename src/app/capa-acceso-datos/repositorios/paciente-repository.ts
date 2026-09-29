import { Injectable } from '@angular/core';
import { Paciente } from '../entidades/paciente';

// Repositorio: guarda los pacientes en memoria (un arreglo),
// igual que PacienteRepository.js en la versión HTML.
@Injectable({
  providedIn: 'root',
})
export class PacienteRepository {
  private pacientes: Paciente[] = [];

  agregar(paciente: Paciente): void {
    this.pacientes.push(paciente);
  }

  obtenerTodos(): Paciente[] {
    return this.pacientes;
  }

  buscarPorId(id: number): Paciente | undefined {
    return this.pacientes.find(p => p.id === id);
  }

  buscarPorCorreo(correo: string): Paciente | undefined {
    return this.pacientes.find(p => p.correo === correo);
  }

  siguienteId(): number {
    return this.pacientes.length + 1;
  }
}
