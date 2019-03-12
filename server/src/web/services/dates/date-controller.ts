import { NextFunction, Response, Request } from 'express';
import { getDate, setDate } from './date-dao';

export const getDateAction = async (req: Request, res: Response, next: NextFunction) => {
    const date = await getDate();
    if (!date) {
        return res.status(200).send(null);
    }
    return res.status(200).send(date);
};

export const setDateAction = async (req: Request, res: Response, next: NextFunction) => {
    const date: Date = new Date();
    const persistedDate = await setDate(date);
    return res.status(200).send(persistedDate);
};
