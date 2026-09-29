import { Component, computed, signal } from '@angular/core';

interface Medico {
  nombre: string;
  especialidad: string;   // se usa para filtrar
  etiqueta: string;       // texto de la insignia rosada
  frase: string;
  imagen: string;
}

@Component({
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
})
export class Medicos {
  readonly especialidades = [
    { filtro: 'todas', nombre: 'Todas' },
    { filtro: 'Terapia Neural', nombre: 'Terapia Neural' },
    { filtro: 'Quiropraxia', nombre: 'Quiropraxia' },
    { filtro: 'Fisioterapia', nombre: 'Fisioterapia' },
    { filtro: 'Nutrición y Dietética Terapéutica', nombre: 'Nutrición y Dietética' },
  ];

  private readonly descripciones: Record<string, string> = {
    'todas': 'Selecciona una especialidad para conocer en qué consiste.',
    'Terapia Neural': 'La Terapia Neural regula el sistema nervioso mediante anestésicos locales aplicados en puntos específicos del cuerpo.',
    'Quiropraxia': 'La Quiropraxia ajusta la columna y las articulaciones para aliviar el dolor y mejorar la movilidad.',
    'Fisioterapia': 'La Fisioterapia recupera el movimiento y la función del cuerpo después de una lesión, cirugía o enfermedad.',
    'Nutrición y Dietética Terapéutica': 'La Nutrición y Dietética Terapéutica diseña planes de alimentación para tratar y prevenir enfermedades.',
  };

  readonly medicos: Medico[] = [
    { nombre: 'Dra. Laura Gómez', especialidad: 'Terapia Neural', etiqueta: 'Terapia Neural',
      frase: 'Ayudo a tu sistema nervioso a recuperar el equilibrio, paso a paso.', imagen: 'imagenes/medico1.jpg' },
    { nombre: 'Dr. Juan Pérez', especialidad: 'Fisioterapia', etiqueta: 'Fisioterapia deportiva',
      frase: 'Comprometido con tu recuperación y tu próximo récord personal.', imagen: 'imagenes/medico2.jpg' },
    { nombre: 'Dra. Catalina Sánchez', especialidad: 'Quiropraxia', etiqueta: 'Quiropraxia',
      frase: 'La salud de tu columna es la base de todo lo demás.', imagen: 'imagenes/medico3.jpg' },
    { nombre: 'Dr. Andrés Cardozo', especialidad: 'Nutrición y Dietética Terapéutica', etiqueta: 'Nutrición y Dietética',
      frase: 'Un plan de alimentación que se adapta a tu vida, no al revés.', imagen: 'imagenes/medico4.jpg' },
    { nombre: 'Dra. Valentina Ríos', especialidad: 'Odontología Estética', etiqueta: 'Odontología estética',
      frase: 'Sonríe con confianza en cada etapa del tratamiento.', imagen: 'imagenes/medico5.jpg' },
    { nombre: 'Dr. Mateo Herrera', especialidad: 'Cardiología', etiqueta: 'Cardiología',
      frase: 'Cuidamos tu corazón con seguimiento cercano y humano.', imagen: 'imagenes/medico6.jpg' },
  ];

  // Especialidad seleccionada en la barra lateral
  readonly filtro = signal('todas');

  // Se recalculan solos cada vez que cambia el filtro
  readonly medicosVisibles = computed(() =>
    this.filtro() === 'todas'
      ? this.medicos
      : this.medicos.filter(m => m.especialidad === this.filtro())
  );

  readonly descripcion = computed(() =>
    this.descripciones[this.filtro()] ?? 'Esta especialidad también hace parte de nuestro equipo médico.'
  );

  seleccionar(filtro: string): void {
    this.filtro.set(filtro);
  }
}
