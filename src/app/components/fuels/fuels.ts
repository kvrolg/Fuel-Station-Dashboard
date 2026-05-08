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
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fuels',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggle,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels {
  private fuelsList = inject(FuelService);
  isAvailable: boolean = false;
  isPremium: boolean = false;

  fuels$: Observable<FuelModel[]> = this.fuelsList.getFuels().pipe(
    tap((items) => {
      this.dataSource.data = items;
      this.dataSource.filterPredicate = (data: FuelModel, filter: string): boolean => {
        const filterByName = data.name.toLowerCase().includes(filter.trim().toLowerCase());
        const filterByAvailability = !this.isAvailable || data.available === true;
        const filterByPremium = !this.isPremium || data.premium === true;
        return filterByName && filterByAvailability && filterByPremium;
      };
    }),
  );
  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
  dataSource = new MatTableDataSource<FuelModel>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onToggleChange(): void {
    const currentFilter = this.dataSource.filter;
    this.dataSource.filter = ' ';
    this.dataSource.filter = currentFilter;
  }
}
