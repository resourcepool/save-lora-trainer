import { Injectable } from '@angular/core';
import { TokenService } from './authentication/token.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private tokenService: TokenService) {
    }

    setTeam(clientId: string) {
        this.tokenService.setToken('user_team', clientId);
    }

    hasTeam(): boolean {
        const team = this.tokenService.getToken('user_team');
        return team !== null;
    }

    getClientId(): string {
        return this.tokenService.getToken('user_team') || '';
    }

    logoutUser(): void {
        this.tokenService.removeToken('user_team');
    }
}
