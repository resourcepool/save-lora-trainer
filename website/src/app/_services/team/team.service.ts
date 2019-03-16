import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Team } from '../../_models';
import { Observable } from 'rxjs';
import { HttpConfigService } from '../http-config.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TeamService {
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

    getById(id: number): Observable<Team> {
        return this.http.get<Team>(`${environment.apiUrl}/teams/` + id, this.httpConfig.getHeaders());
    }

    register(team: Team): Observable<object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + environment.apiJwt
            })
        };
        return this.http.post(`${environment.apiUrl}/teams/add`, this.registerMapper(team), httpOptions);
    }

    update(team: Team): Observable<object> {
        return this.http.put(`${environment.apiUrl}/teams/` + team.id, team, this.httpConfig.getHeaders());
    }

    delete(id: number): Observable<object> {
        return this.http.delete(`${environment.apiUrl}/teams/` + id, this.httpConfig.getHeaders());
    }

    /** Utils **/

    /** Mappers **/
    registerMapper(team: Team): object {
        const devEUISuffix = team.devEUI.replace('13:37:00:00', '');
        return Object.assign({}, team, {devEUISuffix} );
    }
}
