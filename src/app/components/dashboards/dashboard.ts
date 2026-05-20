import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Station } from '../../models/station.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { Fuels } from "../fuels/fuels";
import { Promotions } from "../promotions/promotions";
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { MatIcon } from "@angular/material/icon";
import { DashboardService } from '../../dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, AsyncPipe, Fuels, Promotions, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);
  private fuelsService = inject(FuelService)
  dataSource = new MatTableDataSource<Station>();
  fuelsData = new MatTableDataSource<FuelModel>();

  station$: Observable<Station[]> = this.dashboardService.getStation().pipe(tap((items) => this.dataSource.data = items))
  fuels$: Observable<FuelModel[]> = this.fuelsService.getAvailableFuels().pipe(tap((items) => this.fuelsData.data = items))

}
