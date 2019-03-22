import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { Error404Module } from './errors/404/error-404.module';
import { Error500Module } from './errors/500/error-500.module';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MyteamModule } from './myteam/myteam.module';

@NgModule({
    imports: [
        // Authentication
        AuthenticationModule,
        AdminModule,
        DashboardModule,
        MyteamModule,

        // Errors
        Error404Module,
        Error500Module,
    ]
})
export class PagesModule
{}
