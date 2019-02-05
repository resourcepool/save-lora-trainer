import Team from './Team';
import { dbInstance } from '../web/utils/db-config';


export const findOne = async (id: number): Promise<Team | Error> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE id = ?`, id);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    return rows.length > 0 ? Team.fromDto(rows[0]) : new Error('Team not found');
};

export const findByClientId = async (clientId: string): Promise<Team | Error> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE clientId = ?`, clientId);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    return rows.length > 0 ? Team.fromDto(rows[0]) : new Error('Team not found');
};

export const findByDevEUI = async (devEUI: string): Promise<Team | Error> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE devEUI = ?`, devEUI);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    return rows.length > 0 ? Team.fromDto(rows[0]) : new Error('Team not found');
};


export const addTeam = async (team: Team): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        let dto = {
            id: team.id,
            name: team.name,
            clientId: team.clientId,
            devEUI: team.devEUI,
            progress: JSON.stringify(team.progress)
        };
        res = await con.query('INSERT INTO team SET ?', dto);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }

    return res.affectedRows > 0 ? true : new Error('No team added');
};

export const updateProgress = async (team: Team): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`UPDATE team SET progress = ? WHERE id = ?`, [JSON.stringify(team.progress), team.id]);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    return true;
};

export const deleteTeam = async (id: number): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`DELETE FROM team WHERE id = ?`, id);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }

    return res.affectedRows > 0 ? true : new Error('Team not found or impossible to delete');
};