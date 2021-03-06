import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ScoringService, TeamService, UserService } from 'app/_services';
import { Team } from 'app/_models';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit, OnDestroy {

  teams: Team[] = [];
  private _unsubscribeAll = new Subject();
  private userClientId = '';

  constructor(private teamService: TeamService,
              private scoringService: ScoringService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.generateLeaderboard();
    this.setInterval();
    this.userClientId = this.userService.getClientId();
  }

  generateLeaderboard(): void {
    this.teamService.getAllTeamsProgress()
        .pipe(
            takeUntil(this._unsubscribeAll),
        )
        .subscribe(
        teams => {
          this.teams = this.scoringService.getLeaderboard(teams);
          this.teamService.setTeamsProgress(teams);
        }
    );

  }

  setInterval(): void {
    interval(5000)
        .pipe(
            takeUntil(this._unsubscribeAll)
        )
        .subscribe(() => {
          this.generateLeaderboard();
        });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
