import { Component } from '@angular/core';
import { Header } from './capa-presentacion/header/header';
import { Navbar } from './capa-presentacion/navbar/navbar';
import { Carrusel } from './capa-presentacion/carrusel/carrusel';
import { Medicos } from './capa-presentacion/medicos/medicos';
import { Registro } from './capa-presentacion/registro/registro';
import { Footer } from './capa-presentacion/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Navbar, Carrusel, Medicos, Registro, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
