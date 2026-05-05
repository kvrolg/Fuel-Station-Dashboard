import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { NgForOf, NgClass, AsyncPipe, DatePipe } from "@angular/common";
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-fuels',
  imports: [NgForOf, NgClass, AsyncPipe, DatePipe],
  templateUrl: './fuels.html',
  styleUrl: './fuels.scss',
})
export class Fuels implements OnInit, AfterViewInit{
  date = new Date();

  ngAfterViewInit(): void {
    console.log('After init', this.fuels)
  }
  private fuelsList = inject(FuelService);
  fuels: FuelModel[] = [];
  fuels2: Observable<FuelModel[]> = this.fuelsList.getFuels();
  
  observer = {
    next: (value: FuelModel[]) => {
      this.fuels = value;
      console.log(value);
    },
    error: (err: any) => {
      console.log("%c It is error ","color: red; font-size: 20px;", err);
    },
    complete: () => {
      console.log("Completed");
    }
  }

  ngOnInit(){
    // this.fuels2.subscribe(this.observer);
    console.log('On init', this.fuels)
    // this.fuelsList.getFuels().pipe().subscribe(value => console.log(value));
  }
}
