import { Component, inject, ViewChild } from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { AsyncPipe } from '@angular/common';
import { Observable, single, tap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleModule,
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ChangePriceComponent } from './change-price-component/change-price-component';
import { MatDialog } from '@angular/material/dialog';

interface FilterState {
  name: string;
  available: boolean | null;
  premium: boolean | null;
}

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
  private dialog = inject(MatDialog);
  protected openModal(): void {
    const openedDialog = this.dialog.open(ChangePriceComponent, { disableClose: true });
    openedDialog.afterClosed().subscribe((row: FuelModel) => {
      this.updateFuelRow(row);
    });
  }

  updateFuelRow(updatedRow: FuelModel): void {
    const updatedTable = this.dataSource.data;
    const currentIndex = updatedTable.findIndex((tableRow) => tableRow.id === updatedRow.id);
    if (currentIndex !== -1) {
      updatedTable[currentIndex] = updatedRow;
      this.dataSource.data = [...updatedTable];
    }
  }

  @ViewChild(MatSort) set sort(value: MatSort) {
    this.dataSource.sort = value;
  }
  private fuelsList = inject(FuelService);
  defaultSort: MatSort | undefined;
  filterState: FilterState = { name: '', available: null, premium: null };

  fuels$: Observable<FuelModel[]> = this.fuelsList.getFuels().pipe(
    tap((items) => {
      this.dataSource.data = items;

      this.dataSource.filterPredicate = (singleRow: FuelModel, filter: any): boolean => {
        let filterByName = true;
        let filterByAvailability = true;
        let filterByPremium = true;

        if (typeof filter === 'string') {
          filterByName = singleRow.name.toLowerCase().includes(filter);
        } else if (this.filterState.available) {
          filterByAvailability = filter.available === null || filter === singleRow.available;
        } else if (this.filterState.premium) {
          filterByPremium = filter.premium === null || filter === singleRow.premium;
        }
        return filterByPremium && filterByName && filterByAvailability;
      };
    }),
  );

  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
  dataSource = new MatTableDataSource<FuelModel>();
  applyFilter(event: Event): void {
    this.filterState.name = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = this.filterState.name;
  }

  onToggleChange(filterName: string, event: MatSlideToggleChange): void {
    if (filterName === 'available') {
      this.filterState.available = event.checked;
      (this.dataSource.filter as any) = this.filterState.available;
    } else {
      this.filterState.premium = event.checked;
      (this.dataSource.filter as any) = this.filterState.premium;
    }
  }

  onToggleChangeAvailability(id: string, event: MatSlideToggleChange): void {
    this.fuelsList
      .updateFuelAvailability(+id, event.checked)
      .subscribe((updatedFuel: FuelModel) => {
        this.updateFuelRow(updatedFuel);
      });
  }
}
