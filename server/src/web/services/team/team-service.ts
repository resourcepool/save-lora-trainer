import { map } from 'lodash';
import Step from '../../../progress/models/Step';

export const mapStep = (params: Step, steps: Step[]): Step[] => {
    return map(steps, step => {
        let newStep;
        if (step.tag === params.tag) {
            newStep = Object.assign({}, step, {
                validated: params.validated || false,
                timestamp: params.timestamp || null,
            });
        }
        return newStep || step;
    });
};
