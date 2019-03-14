import { Request, Response, NextFunction } from 'express';
import { HTTP400Error, HTTP401Error } from '../utils/http-errors';
import { isValidTeam } from '../validators/team.validator';
import {isValidHexString, isValidWord, isValidNumber} from '../validators/common.validator';
import { config } from '../../config';
import expressJwt from "express-jwt";

export const checkTeamParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.clientId || !req.body.devEUISuffix) {
        throw new HTTP400Error('Missing parameter(s) of a team');
    } else if (!isValidTeam(req.body.name, req.body.clientId, req.body.devEUISuffix)) {
        throw new HTTP400Error('Invalid parameters');
    } else {
        next();
    }
};

export const checkDevEUIPathVariable = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.devEUI) {
        throw new HTTP400Error('Missing path variable devEUI');
    } else if (!isValidHexString(req.params.devEUI)) {
        throw new HTTP400Error('Invalid parameter devEUI');
    } else {
        next();
    }
};

export const checkClientIdPathVariable = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.clientId) {
        throw new HTTP400Error('Missing path variable clientId');
    } else if (!isValidWord(req.params.clientId)) {
        throw new HTTP400Error('Invalid parameter clientId');
    } else {
        next();
    }
};


export const checkNumberIdPathVariable = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.id) {
        throw new HTTP400Error('Missing path variable id');
    } else if (!isValidNumber(req.params.id)) {
        throw new HTTP400Error('Invalid parameter id');
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

export const authProxyJwtHandler = expressJwt({secret: config.proxySecret});
export const authPublicJwtHandler = expressJwt({secret: config.publicSecret});
export const authAdminJwtHandler = expressJwt({secret: config.adminSecret});
