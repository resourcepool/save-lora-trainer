import 'hammerjs';

import { LOCALE_ID, NgModule } from '@angular/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SharedModule } from 'app/shared/shared.module';
import { Routing } from './app.routing';
import { PagesModule } from 'app/main/pages/pages.module';

// LOCALE SETTINGS
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        SharedModule,
        Routing,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        PagesModule,

    ],
    providers: [],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
