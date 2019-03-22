import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import { TitleService, TeamService, UserService } from 'app/_services';
import { first } from 'rxjs/operators';
import { Team } from '../../../_models';

@Component({
    selector: 'myteam',
    templateUrl: './myteam.component.html',
    styleUrls: ['./myteam.component.scss'],
    animations: fuseAnimations
})
export class MyteamComponent implements OnInit {
    prefixDevEUI = '13:37:00:00:';
    team: Team = null;

    constructor(
        private teamService: TeamService,
        private userService: UserService,
        private titleService: TitleService,
    ) {
    }

    ngOnInit(): void {
        const clientId = this.userService.getClientId();
        const team = this.teamService.getByClientId(clientId).pipe(
            first()
        )
        .subscribe((team: Team) => {
            this.team = team;
            this.titleService.setTitle('Team '+ this.team.name);
        });
    }
}
