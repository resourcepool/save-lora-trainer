import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    constructor() {
    }

    getToken(token: string): string {
        return localStorage.getItem(token);
    }

    setToken(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeToken(key): void {
        localStorage.removeItem(key);
    }
}
