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
import { PromotionService } from '../../promotion-service';
import { Promotion } from '../../models/promotion.model';
import { StationServicesService } from '../../station-services-service';
import { StationService } from '../../models/stationService.model';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, AsyncPipe, Fuels, Promotions, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);
  private fuelsService = inject(FuelService);
  private promotionsService = inject(PromotionService);
  private servicesService = inject(StationServicesService);
  dataSource = new MatTableDataSource<Station>();
  fuelsData = new MatTableDataSource<FuelModel>();
  promotionsData = new MatTableDataSource<Promotion>();
  servicesData = new MatTableDataSource<StationService>();

  station$: Observable<Station[]> = this.dashboardService.getStation().pipe(tap((items) => this.dataSource.data = items))
  fuels$: Observable<FuelModel[]> = this.fuelsService.getAvailableFuels().pipe(tap((items) => this.fuelsData.data = items))
  promotions$: Observable<Promotion[]> = this.promotionsService.getActivePromotions().pipe(tap((items) => this.promotionsData.data = items))
  services$: Observable<StationService[]> = this.servicesService.getAvailableServices().pipe(tap((items) => this.servicesData.data = items))

}
