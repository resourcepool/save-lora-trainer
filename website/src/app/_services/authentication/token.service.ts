import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    constructor() {
    }

    getToken(): string {
        return localStorage.getItem('auth_token');
    }

    setToken(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeToken(key): void {
        localStorage.removeItem(key);
    }
}
