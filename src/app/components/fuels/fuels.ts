import { Component, inject, OnInit} from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { NgForOf, NgClass, AsyncPipe } from "@angular/common";
import { Observable } from 'rxjs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { DataService } from './data.service';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-fuels',
  imports: [NgForOf, NgClass, AsyncPipe, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels implements OnInit{
  private fuelsList = inject(FuelService);
  fuels$: Observable<FuelModel[]> = this.fuelsList.getFuels();
  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
  dataSource = new MatTableDataSource(this.keys)

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    // this.fuels$.getData()
  }
}
