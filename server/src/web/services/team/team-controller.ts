import { NextFunction, Response, Request } from 'express';
import Team from '../../../models/Team';
import { addTeam } from '../../../team/team-dao';
import Progress from "../../../models/Progress";

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


//
//     /** @TODO comment gérer la progression d'une team ?
//      *
//      * Option 1 : utiliser un tableau JSON qu'on mets à jour à chaque step de l'exercice
//      * Option 2 : Faire le controle coté server nodejs plutot que côté exercice et update en conséquence
//      *
//      */
//     updateProgression: (req, res) => {
//     if (!req.body && !req.body.device) {
//         return res.sendStatus(400);
//     }
//
//     const device = req.body.device || null;
//
//     db.createConnection()
//         .then(con => {
//             const result = con.query(`SELECT progression FROM team WHERE device = ?`, device, (error, results) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(400).send(error);
//                 }
//                 if (results.affectedRows > 0) {
//                     return res.status(200).send('OK');
//                 }
//                 return res.status(404).send('NOT FOUND');
//             });
//             con.end();
//             return result;
//         });
// }
