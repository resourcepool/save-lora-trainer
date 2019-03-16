import { Component, OnDestroy, OnInit } from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';
import {fuseAnimations} from '@fuse/animations';

import {locale as english} from './i18n/en';
import {locale as french} from './i18n/fr';
import { TimeService } from 'app/_services/time.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: fuseAnimations
})
export class DashboardComponent implements OnInit, OnDestroy {

    timeElapsed: any;
    private _unsubscribeAll = new Subject();

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {TimeService} timeService
     */
    constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
                private timeService: TimeService) {
        this._fuseTranslationLoaderService.loadTranslations(english, french);
    }

    ngOnInit(): void {
        this.timeService.getTimeAsync().then(() => {
            this.updateTimeElapsed();
        });
    }

    updateTimeElapsed(): void {
        interval(1000)
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.timeElapsed = this.timeService.getTimeElapsed();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
