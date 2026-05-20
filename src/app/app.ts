import { Component, inject, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Navbar, MatSlideToggle, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Fuel-Station-Dashboard');
  
}

