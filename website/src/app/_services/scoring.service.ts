import { Injectable } from '@angular/core';

import { TeamService } from './team/team.service';
import { Progress, Team, Step } from '../_models';
import { map, random, sortBy, sum } from 'lodash';
import { TimeService } from './time.service';
import * as moment from 'moment';

const SCORING_TIME_RATIO = 5;
enum SCORING_TIME_UNIT  {
    seconds = 'seconds',
    minutes = 'minutes',
    hours = 'hours',
}


@Injectable({
    providedIn: 'root',
})
export class ScoringService {
    constructor(private teamService: TeamService,
                private timeService: TimeService) {
    }

    getLeaderboard(teams: Team[]): Team[] {
        const result = map(teams, team => this.getTeamScore(team));
        return sortBy(result, ['score', 'name']).reverse();
    }

    getTeamScore(team: Team): Team {
        const geekInDangerStepsScore: number[] = this.calculateScore(team.progress.geekInDangerSteps);
        const hackerStepsScore: number[] = this.calculateScore(team.progress.hackerSteps);
        team.score = sum([...hackerStepsScore, ...geekInDangerStepsScore]);
        return team;
    }

    calculateScore(steps): number[] {
        const now: Date = new Date();
        return map(steps, (step: Step) => {
            if (step.validated && step.timestamp) {
                const score: number = this.elapsedTime(step.timestamp, now, SCORING_TIME_UNIT.seconds, SCORING_TIME_RATIO) * this.scorePerMinute(step.tag);
                return Math.round(score);
            }
            return 0;
        });
    }

    elapsedTime(start, now, unit, ratio): number {
        const startMoment = moment(start);
        const nowMoment = moment(now);
        return nowMoment.diff(startMoment, unit) / ratio;
    }

    scorePerMinute(tag): number {
        return scoringTable[tag] || 1;
    }

}

const scoringTable = {
    'brokerConnect': 1,
    'brokerSubscribe': 2,
    'joinRequestSupported': 5,
    'joinRequestDecode': 8,
    'createDevice': 3,
    'setDeviceNwkKey': 4,
    'deviceSettingsSet': 5,
    'joinRequestSent': 6,
    'gpsLocationSent': 8,
};
