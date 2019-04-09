import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { SharedModule } from '../../../../shared/shared.module';
import { LoginTeamComponent } from './login-team.component';

const routes = [
    {
        path     : 'login',
        component: LoginTeamComponent
    }
];

@NgModule({
    declarations: [
        LoginTeamComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
        SharedModule,
    ]
})
export class LoginTeamModule
{
}
