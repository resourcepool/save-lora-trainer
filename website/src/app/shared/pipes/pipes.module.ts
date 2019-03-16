import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryPipe } from './country.pipe';
import { LocalizedDatePipe } from './date.pipe';

@NgModule({
    declarations: [
        CountryPipe,
        LocalizedDatePipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CountryPipe,
        LocalizedDatePipe,
    ],
})
export class PipesModule {
}
