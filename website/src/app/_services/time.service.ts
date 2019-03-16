import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpConfigService } from './http-config.service';
import * as moment from 'moment';
import { join } from 'lodash';

@Injectable()
export class TimeService {
    constructor(private http: HttpClient,
                private httpConfig: HttpConfigService) {
    }

    private timeCached: Date = null;

    getTime(): Date {
        return this.timeCached || null;
    }

    getTimeAsync(): Promise<Date | null> {
        if (this.timeCached) {
            console.log('timeCache', this.timeCached)
            return Promise.resolve(this.timeCached);
        }
        return this.http.get<Date>(`${environment.apiUrl}/date`, this.httpConfig.getHeaders()).toPromise().then((res: Date) => {
            this.timeCached = res;
            return res;
        });
    }

    setTime(): Promise<Date> {
        const httpOptions = this.httpConfig.getAdminHeaders();
        return this.http.post<Date>(`${environment.apiAdminUrl}/game/start`, null, httpOptions).toPromise().then(res => {
            this.timeCached = res;
            return res;
        });
    }

    resetGame(): Promise<string> {
        this.timeCached = null;
        const httpOptions = this.httpConfig.getAdminHeaders();
        return this.http.post<string>(`${environment.apiAdminUrl}/game/reset`, null, httpOptions).toPromise();
    }

    getTimeElapsed(): string {
        if (!this.timeCached) {
            return this.mapDuration(0);
        }
        const currentTime = moment();
        const duration = currentTime.diff(this.timeCached, 'seconds');
        return this.mapDuration(duration);
    }

    mapDuration(input: number): string {
        if (input === 0) {
            return null;
        }
        const seconds = input % 60;
        const minutes = Math.floor(input / 60 % 60);
        const hours = Math.floor(input / 3600);
        return join([this.formatTime(hours), this.formatTime(minutes), this.formatTime(seconds)], ':');
    }

    formatTime(time: number): string {
        return time < 10 ? '0' + time : time.toString();
    }
}
