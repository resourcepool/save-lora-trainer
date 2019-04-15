import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from 'app/_services';
import { Step, Team } from 'app/_models';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TeamUtils } from '../../../../_services/team/team.utils';

@Component({
  selector: 'team-progress-manager',
  templateUrl: './team-progress-manager.component.html',
  styleUrls: ['./team-progress-manager.component.scss']
})
export class TeamProgressManagerComponent implements OnInit, OnDestroy {

  teams: Team[] = [];
  private _unsubscribeAll = new Subject();

  constructor(private teamService: TeamService,
              private teamUtils: TeamUtils,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getTeamsProgress();
  }

  getTeamsProgress(): void {
    this.teamService.getAllTeamsProgress()
        .pipe(
            takeUntil(this._unsubscribeAll),
        )
        .subscribe(
        teams => {
          this.teams = teams;
        },
    );
  }

  setUnlocked(step: Step, clientId: string): void {
    const newStep = this.unlockStep(step);
    console.log(newStep, clientId);
    this.teamService.unlockStep(newStep, clientId)
        .pipe(first())
        .subscribe(
            () => {
          this.teams = this.teamUtils.updateTeams(this.teams, clientId, newStep);
          this.snackBar.open(`Step successfully ${newStep.validated ? 'unlocked': 'locked'}!`, null, {
            duration: 4000,
          });
        },
        err => {
          this.snackBar.open(`Impossible to manage step : ${JSON.stringify(err)}`, null, {
            duration: 5000,
          });
        });
  }

  unlockStep(step: Step): Step {
    return Object.assign({}, step, {
      timestamp: !step.validated ? Date.now() : null,
      validated: !step.validated,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
