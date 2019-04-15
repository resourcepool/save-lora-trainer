import { NextFunction, Response, Request } from 'express';
import Team from '../../../team/models/Team';
import { addTeam, findAll, findByClientId, updateProgress } from '../../../team/team-dao';
import Progress from "../../../progress/models/Progress";
import {config} from '../../../config';
import { round, map } from 'lodash';
import { mapStep } from './team-service';

const randomLocation = (): {lat: number, lng: number} => {
    let lngRange = config.team.targetBBox[2] - config.team.targetBBox[0];
    let latRange = config.team.targetBBox[3] - config.team.targetBBox[1];
    const calculatedLng = config.team.targetBBox[0] + (Math.floor(lngRange * Math.random() * 1000) / 1000);
    const calculatedLat = config.team.targetBBox[1] + (Math.floor(latRange * Math.random() * 1000) / 1000);
    return {lng: round(calculatedLng, 3), lat: round(calculatedLat, 3)};
};

export const getTeamPrototypeAction = async(req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({
        devEUIPrefix: config.team.devEUIPrefix
    });
};

export const addTeamAction = async (req: Request, res: Response, next: NextFunction) => {
    const team: Team = {
        name: req.body.name,
        clientId: req.body.clientId,
        devEUI: config.team.devEUIPrefix + req.body.devEUISuffix,
        progress: new Progress(),
        secretLocation: randomLocation()
    };
    await addTeam(team);
    return res.status(204).send(team);
};

export const getTeamAction = async (req: Request, res: Response, next: NextFunction) => {
    const team = await findByClientId(req.params.clientId);
    if (!team) {
        return res.status(404).send("Team not found");
    }
    return res.status(200).send(team);
};

export const getTeamProgressAction = async (req: Request, res: Response, next: NextFunction) => {
    const team = await findByClientId(req.params.clientId);
    if (!team) {
        return res.status(404).send("Team not found");
    }
    return res.status(200).send(team.progress);
};

export const getAllTeamProgressAction = async (req: Request, res: Response, next: NextFunction) => {
    const teams = await findAll();
    if (!teams) {
        return res.status(404).send("No Team found");
    }
    return res.status(200).send(teams);
};

export const unlockChallengeAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await findByClientId(req.body.clientId);
        if (!team) {
            return res.status(404).send('No Team found');
        }

        team.progress.hackerSteps = mapStep(req.body.step, team.progress.hackerSteps || []);
        team.progress.geekInDangerSteps = mapStep(req.body.step, team.progress.geekInDangerSteps || []);

        const result = await updateProgress(team);
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
};

