import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatCardModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { Error404Module } from '../main/pages/errors/404/error-404.module';

import { PipesModule } from './pipes/pipes.module';
import {
    TitleService,
    TeamService,
    ScoringService,
    TimeService,
    AuthenticationService,
    TokenService,
    TeamUtils
} from '../_services';
import { HttpConfigService } from '../_services/http-config.service';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        PipesModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDialogModule,

        // Errors
        Error404Module,
    ],
    exports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        TranslateModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDialogModule,

        // Error Modules
        Error404Module,

        // Pipes
        PipesModule,
    ],
    providers: [
        TeamService,
        TeamUtils,
        TitleService,
        ScoringService,
        TimeService,
        AuthenticationService,
        TokenService,
        HttpConfigService,
    ],
})
export class SharedModule {
}
