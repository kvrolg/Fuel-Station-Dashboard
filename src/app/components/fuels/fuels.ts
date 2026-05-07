import { Component, inject} from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { AsyncPipe } from "@angular/common";
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-fuels',
  imports: [AsyncPipe, MatTableModule, MatButtonModule],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels{
  private fuelsList = inject(FuelService);
  fuels$: Observable<FuelModel[]> = this.fuelsList.getFuels();
  keys: string[] = ['name', 'price', 'category', 'available', 'stockLevel', 'premium'];
}
