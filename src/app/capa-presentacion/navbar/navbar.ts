import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  // La clase sticky-top va en la etiqueta <app-navbar> y no en el <nav>:
  // así el menú se queda pegado arriba al hacer scroll, como en el HTML.
  host: { class: 'd-block sticky-top' },
})
export class Navbar {}
