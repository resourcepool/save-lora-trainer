import { NextFunction, Response, Request } from 'express';
import Team from '../../../team/models/Team';
import {addTeam, findByClientId} from '../../../team/team-dao';
import Progress from "../../../progress/models/Progress";

export const addTeamAction = async (req: Request, res: Response, next: NextFunction) => {
    const team: Team = {
        name: req.body.name,
        clientId: req.body.clientId,
        devEUI: req.body.devEUI,
        progress: new Progress()
    };
    await addTeam(team);
    return res.status(204).send('CREATED');
};

export const getTeamProgressAction = async (req: Request, res: Response, next: NextFunction) => {
    const team = await findByClientId(req.params.clientId);
    if (!team) {
        return res.status(404).send("Team not found");
    }
    return res.status(200).send(team.progress);
};