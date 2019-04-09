import { FormControl } from '@angular/forms';
import { devEUIs } from 'app/_data';
import { includes } from 'lodash';
import { environment } from 'app/../environments/environment';

export function validateDevEUI(c: FormControl) {
    // Check in config if we should verify if the EUI is in the list
    if (!environment.checkEUIs) {
        return null;
    }

    return includes(devEUIs, c.value.toLowerCase()) ? null : {
        validateDevEUI: {
            valid: false
        }
    };
}
