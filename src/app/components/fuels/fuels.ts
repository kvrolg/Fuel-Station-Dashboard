import { Component, inject } from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { NgForOf, NgClass } from "@angular/common";


@Component({
  selector: 'app-fuels',
  imports: [NgForOf, NgClass],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels {
  private fuelsList = inject(FuelService);
  fuels: FuelModel[] = [];
  
  observer = {
    next: (value: FuelModel[]) => {
      this.fuels = value;
      console.log(value);
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {
      console.log("Completed");
    }
  }

  ngOnInit(){
    this.fuelsList.getFuels().subscribe(this.observer);
  }
}
