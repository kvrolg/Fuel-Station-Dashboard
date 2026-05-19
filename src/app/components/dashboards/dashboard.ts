import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard-service';
import { Observable, tap } from 'rxjs';
import { Station } from '../../models/station.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { Fuels } from "../fuels/fuels";
import { Promotions } from "../promotions/promotions";

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, AsyncPipe, Fuels, Promotions],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);
  dataSource = new MatTableDataSource<Station>();

  station$: Observable<Station[]> = this.dashboardService.getStation().pipe(tap((items) => this.dataSource.data = items))

}
