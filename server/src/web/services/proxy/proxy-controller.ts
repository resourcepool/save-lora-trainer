import { NextFunction, Response, Request } from 'express';
import * as client from '../../../appserver/lora-appserver-client';

export const createDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await client.createDevice(req.body);
        return res.status(204).send('CREATED');
    } catch (e) {
        return next(e);
    }
};

export const deviceNwkKeyExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await client.deviceNwkKeyExists(req.params.devEUI);
        return res.status(200).send(true);
    } catch (e) {
        return next(e);
    }
};
