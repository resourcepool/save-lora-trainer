import { NextFunction, Response, Request } from 'express';
import {
    createJoinRequestSupportedChallenge,
    solveJoinRequestSupportedChallenge
} from '../../../challenge/challenge-service';

export const getJoinRequestSupportedChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await createJoinRequestSupportedChallenge(req.params.clientId);
    if (result instanceof Error) {
        return res.status(400).send(result.message);
    }
    return res.contentType("application/json; charset=utf-8").status(200).send(result);
};

export const submitJoinRequestSupportedChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await solveJoinRequestSupportedChallenge(req.body);
    if (result instanceof Error) {
        return res.status(400).send(result.message);
    }
    return res.contentType("application/json; charset=utf-8").status(200).send({done: result});
};