import { Pipe, PipeTransform } from '@angular/core';
import { countries } from '../../_data/countries';
import { find } from 'lodash';

/**
 * Transform a country to his long name
 */
@Pipe({name: 'country'})
export class CountryPipe implements PipeTransform {
    transform(value: string): string {
        const val: ICountry = find(countries, ['value', value]);
        return val ? val.viewValue : value;
    }
}

interface ICountry {
    value: string;
    viewValue: string;
}