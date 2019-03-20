import { NextFunction, Response, Request } from 'express';
import { getStartDate, startGame, deleteAll } from '../../../game/game-dao';

export const getDateAction = async (req: Request, res: Response, next: NextFunction) => {
    const date = await getStartDate();
    if (!date) {
        return res.status(200).send(null);
    }
    return res.status(200).send(date);
};

export const setDateAction = async (req: Request, res: Response, next: NextFunction) => {
    const date: Date = new Date();
    const persistedDate = await startGame(date);
    return res.status(200).send(persistedDate);
};

export const resetDateAction = async (req: Request, res: Response, next: NextFunction) => {
    const rows = await deleteAll();
    return res.status(200).send({status: "OK", ngLines: rows});
};
