import { Injectable } from '@angular/core';

import { Step, Team } from '../../_models';
import { map } from 'lodash';

@Injectable()
export class TeamUtils {

    constructor() {
    }

    updateTeams(teams: Team[], clientId: string, step: Step) {
        return map(teams, team => {
            if (team.clientId === clientId) {
                team.progress.hackerSteps = this.mapStep(team.progress.hackerSteps, step);
                team.progress.geekInDangerSteps = this.mapStep(team.progress.geekInDangerSteps, step);
            }
            return team;
        });
    }

    mapStep(steps: Step[], value: Step): Step[] {
        return map(steps, step => {
            let newStep;
            if (step.tag === value.tag) {
                newStep = Object.assign({}, step, {
                    validated: value.validated || false,
                    timestamp: value.timestamp || null,
                });
            }
            return newStep || step;
        });
    }
}
