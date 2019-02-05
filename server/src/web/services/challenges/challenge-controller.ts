import { NextFunction, Response, Request } from 'express';
import { createJoinRequestSupportedChallenge } from '../../../challenge/challenge-service';

export const getJoinRequestSupportedChallenge = async (req: Request, res: Response, next: NextFunction) => {
    let result = await createJoinRequestSupportedChallenge(req.params.devEUI);
    if (result instanceof Error) {
        return res.status(400).send(result.message);
    }
    return res.contentType("application/json; charset=utf-8").status(204).send(result);
};