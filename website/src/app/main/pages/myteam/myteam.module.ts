import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { MyteamComponent } from './myteam.component';

const routes = [
    {
        path     : 'myteam',
        component: MyteamComponent
    }
];

@NgModule({
    declarations: [
        MyteamComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        SharedModule,
    ]
})
export class MyteamModule
{
}
