import Team from '../../../../models/Team';
import { dbInstance } from '../../../utils/DbConfig';

export const addTeam = async (team: Team): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query('INSERT INTO team SET ?', team);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }

    return res.affectedRows > 0 ? true : new Error('No team added');
};

export const editTeam = async (team: Team, id: number): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`UPDATE team SET name="${team.name}", clientId="${team.clientId}" WHERE id = ?`, id);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }

    return res.affectedRows > 0 ? true : new Error('Team not found or impossible to edit');
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