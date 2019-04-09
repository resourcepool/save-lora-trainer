import { NgModule } from '@angular/core';

import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LoginTeamModule } from './login-team/login-team.module';

@NgModule({
    imports: [
        RegisterModule,
        LoginModule,
        LoginTeamModule,
    ]
})
export class AuthenticationModule
{
}
