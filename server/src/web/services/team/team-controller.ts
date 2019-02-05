import { NextFunction, Response, Request } from 'express';
import Team from '../../../team/Team';
import { addTeam } from '../../../team/team-dao';
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