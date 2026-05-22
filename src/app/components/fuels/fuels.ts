import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatSlideToggle,
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { ChangePriceComponent } from './change-price-component/change-price-component';

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
    MatSortModule,
    MatProgressSpinner,
    NgStyle,
    NgClass,
    MatIcon,
    NgIf
],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels implements AfterViewInit {
  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
  dataSource = new MatTableDataSource<FuelModel>();
  private dialog = inject(MatDialog);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private fuelsList = inject(FuelService);
  private destroyRef = inject(DestroyRef);
  defaultSort: MatSort | undefined;
  filterState: FilterState = { name: '', available: null, premium: null };

  @ViewChild(MatSort) set sort(value: MatSort) {
    this.dataSource.sort = value;
  }
  protected openModal(): void {
    const openedDialog = this.dialog.open(ChangePriceComponent, { disableClose: true });
    openedDialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((row: FuelModel) => {
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

  applyFilter(event: Event): void {
    this.filterState.name = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = this.filterState.name;
  }

  toggleChange(filterName: string, event: MatSlideToggleChange): void {
    if (filterName === 'available') {
      this.filterState.available = event.checked;
      (this.dataSource.filter as any) = this.filterState.available;
    } else {
      this.filterState.premium = event.checked;
      (this.dataSource.filter as any) = this.filterState.premium;
    }
  }

  toggleChangeAvailability(id: string, event: MatSlideToggleChange): void {
    this.fuelsList
      .updateFuelAvailability(+id, event.checked)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((updatedFuel: FuelModel) => {
        this.updateFuelRow(updatedFuel);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  get cheapestPrice(): number {
    const newTable = this.dataSource.data;
    if (!newTable) {
      return 0;
    }
    return Math.min(...newTable.map((fuel) => fuel.price));
  }
}
