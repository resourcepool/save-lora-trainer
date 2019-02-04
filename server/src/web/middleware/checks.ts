import { Request, Response, NextFunction } from 'express';
import { HTTP400Error, HTTP401Error } from '../utils/httpErrors';
import { isValidTeam } from '../validators/team.validator';
import { config } from '../../config';

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP400Error('Missing q parameter');
    } else {
        next();
    }
};

export const checkTeamParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.clientId) {
        throw new HTTP400Error('Missing parameter(s) of a team');
    } else if (!isValidTeam(req.body.name, req.body.clientId)) {
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
