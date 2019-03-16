import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { TeamService } from 'app/_services';

@Component({
    selector: 'team-progress',
    templateUrl: './team-progress.component.html',
    styleUrls: ['./team-progress.component.scss']
})
export class TeamProgressComponent implements OnInit, OnDestroy {

    private _unsubscribeAll = new Subject();

    @Input() progress: object;
    @Input() clientId;
    @Input() category: string;

    constructor(private teamService: TeamService) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(): void {
        // interval(5000)
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         mergeMap(() => this.teamService.getTeamProgress(this.clientId)))
        //     .subscribe((data) => {
        //         this.progress = data[this.category];
        //     });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
