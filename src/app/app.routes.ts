import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboards/dashboard';
import { Fuels } from './components/fuels/fuels';
import { Promotions } from './components/promotions/promotions';
import { Services } from './components/services/services';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    {path: 'dashboard', component: Dashboard},
    {path: 'fuels', component: Fuels},
    {path: 'promotions', component: Promotions},
    {path: 'services', component: Services},

    {path: '**', redirectTo: '/dashboard' },
];
