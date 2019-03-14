import { NextFunction, Response, Request } from 'express';
import * as adminService from '../../../admin/admin-service';

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    let userNToken = adminService.authenticate(req.body.username, req.body.password);
    if (!userNToken) {
        return res.status(401).send("Error: Wrong credentials");
    }
    return res.status(200).send(userNToken);
};

export const resetAction = async(req: Request, res: Response, next: NextFunction) => {
    await adminService.resetGame();
    return res.status(200).send("OK");
};
