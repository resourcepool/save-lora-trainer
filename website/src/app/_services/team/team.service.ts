import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Step, Team } from '../../_models';
import { Observable } from 'rxjs';
import { HttpConfigService } from '../http-config.service';
import { filter, map, find } from 'lodash';

@Injectable()
export class TeamService {

    private teamProgress: Team[] = [];

    constructor(private http: HttpClient,
                private httpConfig: HttpConfigService) {
    }

    getAll(): Observable<Team[]> {
        return this.http.get<Team[]>(`${environment.apiUrl}/teams`, this.httpConfig.getHeaders());
    }

    getAllTeamsProgress(): Observable<Team[]> {
        return this.http.get<Team[]>(`${environment.apiUrl}/teams/progress`, this.httpConfig.getHeaders());
    }

    getTeamProgress(clientId): Observable<Team[]> {
        return this.http.get<Team[]>(`${environment.apiUrl}/teams/client/${clientId}/progress`, this.httpConfig.getHeaders());
    }

    getByClientId(clientId: string): Observable<Team> {
        return this.http.get<Team>(`${environment.apiUrl}/teams/client/` + clientId, this.httpConfig.getHeaders());
    }

    register(team: Team): Observable<object> {
        return this.http.post(`${environment.apiUrl}/teams/add`, this.registerMapper(team), this.httpConfig.getHeaders());
    }

    update(team: Team): Observable<object> {
        return this.http.put(`${environment.apiUrl}/teams/` + team.id, team, this.httpConfig.getHeaders());
    }

    delete(id: number): Observable<object> {
        return this.http.delete(`${environment.apiUrl}/teams/` + id, this.httpConfig.getHeaders());
    }

    /** Utils **/
    setTeamsProgress(teams: Team[]): void {
        this.teamProgress = teams;
    }

    getTeamsLocation(): Team[] {
        return filter(this.teamProgress, team => {
            return Boolean(find(team.progress.geekInDangerSteps || {}, (o: Step) => o.validated && o.tag === 'gpsLocationSent'));
        });
    }

    getLocalClientId() {
        return map(this.teamProgress, 'clientId');
    }

    /** Mappers **/
    registerMapper(team: Team): object {
        const devEUISuffix = team.devEUI.replace('13:37:00:00', '');
        return Object.assign({}, team, {devEUISuffix} );
    }
}
