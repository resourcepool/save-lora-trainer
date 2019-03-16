import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { TeamTableComponent } from './team-table/team-table.component';
import { MatIconModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TeamProgressComponent } from './team-table/team-progress/team-progress.component';

const routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        TeamTableComponent,
        TeamProgressComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        SharedModule,

        FuseSharedModule,
        FuseWidgetModule,

        MatTableModule,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        MatSnackBarModule,
    ],
    exports     : [
        DashboardComponent
    ]
})

export class DashboardModule
{
}
