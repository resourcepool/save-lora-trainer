import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';

import {TitleService, TeamService, UserService} from 'app/_services';
import {first, takeUntil} from 'rxjs/operators';
import {Team} from '../../../_models';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
    selector: 'myteam',
    templateUrl: './myteam.component.html',
    styleUrls: ['./myteam.component.scss'],
    animations: fuseAnimations
})
export class MyteamComponent implements OnInit, OnDestroy {
    prefixDevEUI = '13:37:00:00:';
    team: Team = null;

    private _unsubscribe: Subject<any>;

    constructor(
        private teamService: TeamService,
        private userService: UserService,
        private titleService: TitleService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this._unsubscribe = new Subject();
        const clientId = this.userService.getClientId();
        this.teamService.getByClientId(clientId).pipe(
            first(),
            takeUntil(this._unsubscribe)
        )
            .subscribe((team: Team) => {
                    this.team = team;
                    this.titleService.setTitle('Team ' + this.team.name);
                },
                err => {
                    this.userService.logoutUser();
                    this._router.navigate(['login']);
                });
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    insertCharsEveryNChars(str, n): string {
        let ret = [];
        let i;
        let len;

        for (i = 0, len = (str || '').length; i < len; i += n) {
            ret.push(str.substr(i, n))
        }

        return ret.join(":")
    }
}
