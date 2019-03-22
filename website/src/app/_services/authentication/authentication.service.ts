import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpConfigService } from '../http-config.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient,
                private httpConfig: HttpConfigService,
                private tokenService: TokenService) {
    }

    authenticate(user: any): Observable<string> {
        const url = `${environment.apiUrl}/authenticate`;
        const body = new HttpParams().append('username', user.username).append('password', user.password);
        const httpOptions = this.httpConfig.getHeaders();

        return this.http
            .post<any>(url, body, httpOptions)
            .pipe(map((response: LoginResponse) => {
                if (response.token) {
                    this.tokenService.setToken('auth_token', response.token);
                }
                return response.token;
            }));
    }

    logout(): void {
        this.tokenService.removeToken('auth_token');
    }

    loggedIn(): boolean {
        const token = this.tokenService.getToken('auth_token');
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
    }

    getUser(): string {
        if (!this.loggedIn()) {
            return null;
        }
        const token = this.tokenService.getToken('auth_token');
        const helper = new JwtHelperService();
        return helper.decodeToken(token);
    }
}

interface LoginResponse {
    token: string;
}
