import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
    constructor(private titleService: Title) {
    }

    setTitle(title: string) {
        this.titleService.setTitle(`${environment.name} : ${title}`);
    }
}