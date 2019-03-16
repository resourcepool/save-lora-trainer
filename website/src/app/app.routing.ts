import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './main/pages/errors/404/error-404.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: '**',
        redirectTo: '404'
    },
    {
        path: '404',
        component: Error404Component
    },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
