import { Request, Response, NextFunction } from 'express';
import { HTTP400Error, HTTP401Error } from '../utils/http-errors';
import { isValidTeam } from '../validators/team.validator';
import { config } from '../../config';

export const checkTeamParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.clientId || !req.body.devEUI) {
        throw new HTTP400Error('Missing parameter(s) of a team');
    } else if (!isValidTeam(req.body.name, req.body.clientId, req.body.devEUI)) {
        throw new HTTP400Error('Invalid parameters');
    } else {
        next();
    }
};

export const checkIdParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.id) {
        throw new HTTP400Error('Missing id parameter');
    } else {
        next();
    }
};

export const checkPassword = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.password) {
        throw new HTTP400Error('Missing password parameter');
    } else if (req.body.password !== config.apiPassword) {
        throw new HTTP401Error('Not authorized');
    } else {
        next();
    }
};
