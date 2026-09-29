import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GestionarPacientes } from '../../fachada-services/gestionar-pacientes';
import { correo, longitud, marcado, obligatorio, telefono } from './validaciones';

// Bootstrap se carga como script global desde angular.json
declare const bootstrap: any;

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private fb = inject(NonNullableFormBuilder);
  private gestionarPacientes = inject(GestionarPacientes);

  @ViewChild('modalBienvenida') modalBienvenida!: ElementRef<HTMLElement>;

  // Formulario con sus reglas de validación
  readonly formRegistro = this.fb.group({
    nombreCompleto: ['', longitud(3, 60)],
    correoRegistro: ['', correo()],
    telefonoRegistro: ['', telefono()],
    tipoDocumento: ['', obligatorio()],
    numeroDocumento: ['', obligatorio()],
    fechaNacimiento: ['', obligatorio()],
    generoRegistro: ['', obligatorio()],
    aceptaTerminos: [false, marcado()],
  });

  // Mensaje que se muestra debajo de cada campo cuando no es válido
  readonly mensajes: Record<string, string> = {
    nombreCompleto: 'Escribe tu nombre completo (mínimo 3 caracteres).',
    correoRegistro: 'Escribe un correo electrónico válido.',
    telefonoRegistro: 'El teléfono debe tener entre 7 y 10 dígitos.',
    tipoDocumento: 'Selecciona un tipo de documento.',
    numeroDocumento: 'El número de documento es obligatorio.',
    fechaNacimiento: 'La fecha de nacimiento es obligatoria.',
    generoRegistro: 'Selecciona un género.',
    aceptaTerminos: 'Debes aceptar los términos para continuar.',
  };

  // Datos para personalizar la bienvenida
  readonly primerNombre = signal('');
  readonly correoBienvenida = signal('');

  // El error aparece cuando el campo ya se tocó (perdió el foco)
  // o cuando se intentó enviar el formulario, igual que antes.
  tieneError(campo: string): boolean {
    const control = this.formRegistro.get(campo);
    return !!control && control.invalid && control.touched;
  }

  registrar(): void {
    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched(); // muestra todos los errores
      alert('Por favor, complete correctamente el formulario.');
      return;
    }

    const datos = this.formRegistro.getRawValue();
    const paciente = this.gestionarPacientes.registrarPaciente(
      datos.nombreCompleto.trim(),
      datos.correoRegistro.trim(),
      datos.telefonoRegistro.trim(),
      datos.tipoDocumento,
      datos.numeroDocumento.trim(),
      datos.fechaNacimiento,
      datos.generoRegistro
    );
    console.log('Paciente registrado en el sistema:', paciente);

    this.primerNombre.set(paciente.nombreCompleto.split(' ')[0]);
    this.correoBienvenida.set(paciente.correo);
    bootstrap.Modal.getOrCreateInstance(this.modalBienvenida.nativeElement).show();
  }

  // Se llama cuando la persona cierra la bienvenida (evento
  // hidden.bs.modal de Bootstrap, enlazado en registro.html).
  // reset() limpia el formulario y también quita los mensajes de error.
  alCerrarBienvenida(): void {
    this.formRegistro.reset();
  }
}
