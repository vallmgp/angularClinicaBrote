import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validadores del formulario de registro.
// Son las mismas reglas que tenía validacion.js en la versión HTML.

// Campo obligatorio (un texto con solo espacios cuenta como vacío)
export function obligatorio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value ?? '').toString().trim();
    return valor === '' ? { obligatorio: true } : null;
  };
}

// Longitud entre min y max caracteres, sin contar espacios al inicio o al final
export function longitud(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const largo = (control.value ?? '').toString().trim().length;
    return largo < min || largo > max ? { longitud: { min, max } } : null;
  };
}

// Correo con formato nombre@dominio.ext
export function correo(): ValidatorFn {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (control: AbstractControl): ValidationErrors | null =>
    regexCorreo.test((control.value ?? '').toString().trim()) ? null : { correo: true };
}

// Teléfono de 7 a 10 dígitos
export function telefono(): ValidatorFn {
  const regexTelefono = /^[0-9]{7,10}$/;
  return (control: AbstractControl): ValidationErrors | null =>
    regexTelefono.test((control.value ?? '').toString().trim()) ? null : { telefono: true };
}

// Casilla que debe estar marcada (términos y condiciones)
export function marcado(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    control.value === true ? null : { marcado: true };
}
