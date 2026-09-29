import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';

// Bootstrap se carga como script global desde angular.json
declare const bootstrap: any;

// Evento que lanza Bootstrap justo cuando empieza a cambiar de slide
interface EventoCarrusel extends Event {
  from: number;                  // slide que se va
  to: number;                    // slide que llega
  direction: 'left' | 'right';   // left = siguiente, right = anterior
}

interface Promocion {
  clase: string;        // clase CSS que ajusta el encuadre de la foto
  imagen: string;       // ruta dentro de /public
  descripcionFoto: string;
  antetitulo: string;
  titulo: string;
  textoAntes: string;
  resaltado: string;    // palabras en Parisienne verde sage
  textoDespues: string;
  boton: string;
  enlace: string;
}

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel implements AfterViewInit {
  @ViewChild('carrusel') carrusel!: ElementRef<HTMLElement>;

  readonly promociones: Promocion[] = [
    {
      clase: 'promo-valoracion',
      imagen: 'imagenes/valoracionInicial.JPG',
      descripcionFoto: 'Recepción de la clínica, luminosa y en tonos crema',
      antetitulo: 'Tu primer paso con nosotros',
      titulo: 'Valoración inicial',
      textoAntes: 'Agenda tu primera cita ',
      resaltado: 'sin costo',
      textoDespues: ' y te ayudamos a armar el plan de tratamiento ideal para ti.',
      boton: 'Agendar ahora',
      enlace: '#registro',
    },
    {
      clase: 'promo-bienestar',
      imagen: 'imagenes/bienestarIntegral.JPG',
      descripcionFoto: 'Sala de tratamiento con paredes rosadas y camilla blanca',
      antetitulo: 'Paquete de tres meses',
      titulo: 'Bienestar integral',
      textoAntes: 'Fisioterapia, nutrición y seguimiento personalizado, con ',
      resaltado: '20% de descuento',
      textoDespues: '.',
      boton: 'Ver el paquete',
      enlace: '#medicos',
    },
    {
      clase: 'promo-neural',
      imagen: 'imagenes/saludNeural.JPG',
      descripcionFoto: 'Sala de relajación con cortinas rosadas y luces cálidas',
      antetitulo: 'Jornada especial del mes',
      titulo: 'Salud neural',
      textoAntes: 'Cupos especiales de Terapia Neural con nuestras ',
      resaltado: 'especialistas certificadas',
      textoDespues: '.',
      boton: 'Reservar cupo',
      enlace: '#medicos',
    },
  ];

  // Estado de la animación de los textos
  readonly slideActual = signal(0);                  // sus textos entran
  readonly slideAnterior = signal<number | null>(null); // sus textos salen
  readonly avanzando = signal(true);                 // true = siguiente, false = anterior

  // Se llama cuando Bootstrap empieza a cambiar de promoción
  // (evento slide.bs.carousel, enlazado en carrusel.html)
  alCambiarSlide(evento: Event): void {
    const e = evento as EventoCarrusel;
    this.slideAnterior.set(e.from);
    this.slideActual.set(e.to);
    this.avanzando.set(e.direction === 'left');
  }

  // Angular dibuja el carrusel después de que Bootstrap busca los
  // carruseles de la página, así que lo arrancamos nosotros aquí.
  ngAfterViewInit(): void {
    bootstrap.Carousel.getOrCreateInstance(this.carrusel.nativeElement, {
      interval: 6500,
      ride: 'carousel',
    });
  }
}
