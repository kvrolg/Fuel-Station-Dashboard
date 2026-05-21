import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { DashboardService } from '../../dashboard-service';
import { FuelService } from '../../fuel-service';
import { FuelModel } from '../../models/fuel.model';
import { Promotion } from '../../models/promotion.model';
import { Station } from '../../models/station.model';
import { StationService } from '../../models/stationService.model';
import { PromotionService } from '../../promotion-service';
import { StationServicesService } from '../../station-services-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    AsyncPipe,
    MatIcon,
    MatProgressBarModule,
    DecimalPipe,
    MatTableModule,
    MatProgressSpinnerModule
  ],
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
  fuelsDataColumns: string[] = ['type', 'price', 'stock'];

  station$: Observable<Station[]> = this.dashboardService
    .getStation()
    .pipe(tap((items) => (this.dataSource.data = items)));
  fuels$: Observable<FuelModel[]> = this.fuelsService
    .getAvailableFuels()
    .pipe(tap((items) => (this.fuelsData.data = items)));
  promotions$: Observable<Promotion[]> = this.promotionsService
    .getActivePromotions()
    .pipe(tap((items) => (this.promotionsData.data = items)));
  services$: Observable<StationService[]> = this.servicesService
    .getAvailableServices()
    .pipe(tap((items) => (this.servicesData.data = items)));
}
