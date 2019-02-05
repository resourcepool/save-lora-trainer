import { NextFunction, Response, Request } from 'express';
import Team from '../../../team/Team';
import {addTeam, findByClientId} from '../../../team/team-dao';
import Progress from "../../../progress/Progress";

export const addTeamAction = async (req: Request, res: Response, next: NextFunction) => {
    const team: Team = {
        name: req.body.name,
        clientId: req.body.clientId,
        devEUI: req.body.devEUI,
        progress: new Progress()
    };
    const result = await addTeam(team);
    if (typeof result !== 'boolean') {
        return res.status(400).send(result.message);
    }
    return res.status(204).send('CREATED');
};


export const getTeamProgressAction = async (req: Request, res: Response, next: NextFunction) => {
    const team = await findByClientId(req.params.clientId);
    if (team instanceof Error) {
        return res.status(400).send(team.message);
    }
    return res.status(200).send(team.progress);
};