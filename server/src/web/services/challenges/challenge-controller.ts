import {NextFunction, Request, Response} from 'express';
import {
    createJoinRequestDecodeChallenge,
    createJoinRequestSupportedChallenge,
    solveJoinRequestDecodeChallenge,
    solveJoinRequestSupportedChallenge
} from '../../../challenge/challenge-service';

export const getJoinRequestSupportedChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await createJoinRequestSupportedChallenge(req.params.clientId);
    return res.send(result);
};

export const submitJoinRequestSupportedChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await solveJoinRequestSupportedChallenge(req.body);
    return res.send({done: result});
};

export const getJoinRequestDecodeChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await createJoinRequestDecodeChallenge(req.params.clientId);
    return res.send(result);
};

export const submitJoinRequestDecodeChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await solveJoinRequestDecodeChallenge(req.body);
    return res.send({done: result});
};