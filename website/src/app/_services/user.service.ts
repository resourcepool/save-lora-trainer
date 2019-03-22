import { Injectable } from '@angular/core';
import { TokenService } from './authentication/token.service';
import { Team } from '../_models';
import { includes } from 'lodash';
import { TeamService } from './team/team.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private tokenService: TokenService,
                private teamService: TeamService) {
    }

    setTeam(clientId: string) {
        this.tokenService.setToken('user_team', clientId);
    }

    hasTeam(): boolean {
        // @TODO make control in already existing teams
        //const teams = this.teamService.getLocalClientId();
        const team = this.tokenService.getToken('user_team');
        return team !== null
    }

    getClientId(): string {
        return this.tokenService.getToken('user_team') || '';
    }
}
