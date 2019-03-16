import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { fuseAnimations } from '@fuse/animations';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { TimeService } from 'app/_services/time.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: fuseAnimations
})
export class AdminComponent implements OnInit {

    startDate: Date;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {TimeService} timeService
     * @param {MatSnackBar} snackBar
     */
    constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
                private timeService: TimeService,
                private snackBar: MatSnackBar) {
        this._fuseTranslationLoaderService.loadTranslations(english, french);
    }

    ngOnInit(): void {
        this.updateTime();
    }

    updateTime(): void {
        this.timeService.getTimeAsync().then((date: Date) => {
            this.startDate = date;
        });
    }

    startGame(): void {
        this.timeService.setTime().then(() => this.updateTime());
    }

    resetDate(): void {
        this.timeService.resetGame().then(() => {
                this.startDate = null;
                this.snackBar.open('Date reset successfully done!', null, {
                    duration: 3000,
                });
            },
            (err) => {
                console.log(err);
            });
    }

    resetGame(): void {
         this.timeService.resetGame().then(() => {
                 this.startDate = null;
                 this.snackBar.open('Game reset successfully done!', null, {
                     duration: 3000,
                 });
            },
             (err) => {
                console.log(err);
         });
    }
}
