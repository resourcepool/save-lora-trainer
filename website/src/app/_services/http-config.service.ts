import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication/authentication.service';
import { TokenService } from './authentication/token.service';

@Injectable()
export class HttpConfigService{
    /**
     * Service pour recuperer les headers avant une requete HTTP
     * @param {AuthenticationService} _tokenService
     */
    constructor(private _tokenService: TokenService) {
    }

    getConfig(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + environment.apiJwt
        });
    }

    getAdminConfig(): HttpHeaders {
        const accessToken = this._tokenService.getToken('auth_token') || '';
        return new HttpHeaders({
            'Authorization': 'Bearer ' + accessToken
        });
    }

    getHeaders(admin = false): Headers {
        return {
            headers: admin ? this.getAdminConfig() : this.getConfig(),
        };
    }

    getAdminHeaders(): Headers {
        return this.getHeaders(true);
    }
}

interface Headers {
    headers: HttpHeaders;
}
