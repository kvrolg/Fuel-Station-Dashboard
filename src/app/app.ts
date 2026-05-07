import { Component, inject, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [ Navbar, MatSlideToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Fuel-Station-Dashboard');
  
}

