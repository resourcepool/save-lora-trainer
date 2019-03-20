import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { FuseSharedModule } from '@fuse/shared.module';

import { RegisterComponent } from 'app/main/pages/authentication/register/register.component';

const routes = [
    {
        path     : 'register',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,

        SharedModule,
    ]
})
export class RegisterModule
{
}
