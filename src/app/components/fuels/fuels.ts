import { Component, inject, OnInit } from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-fuels',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
  ],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels {
  private fuelsList = inject(FuelService);
  fuels$: Observable<FuelModel[]> = this.fuelsList.getFuels().pipe(
    tap((items) => {
      this.dataSource.data = items;
      this.dataSource.filterPredicate = (data: FuelModel, filter: string): boolean => { 
        console.log(data)
        return data.name.toLowerCase().includes(filter.trim().toLowerCase());
      };
    }),
  );
  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
  dataSource = new MatTableDataSource<FuelModel>([]);
  fuelTable: FuelModel[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource.data);
  }
}
