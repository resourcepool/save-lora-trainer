import Challenge from './Challenge';
import {dbInstance} from '../web/utils/db-config';

export const findOne = async (id: number): Promise<Challenge | Error> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM challenge WHERE id = ?`, id);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    return rows.length > 0 ? Challenge.fromDto(rows[0]) : new Error('Challenge not found');
};

export const create = async (challenge: Challenge): Promise<Challenge | Error> => {
    const con = await dbInstance();
    let res;
    try {
        let dto = {
            id: challenge.id,
            tag: challenge.tag,
            teamId: challenge.teamId,
            devEUI: challenge.devEUI,
            content: JSON.stringify(challenge.content)
        };
        res = await con.query('INSERT INTO challenge SET ?', dto);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }
    if (res.affectedRows === 0) {
        return new Error('No challenge added');
    }
    challenge.id = res.insertId;
    return challenge;
};

export const deleteOne = async (id: number): Promise<boolean | Error> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`DELETE FROM challenge WHERE id = ?`, id);
    } catch (error) {
        return new Error(error.code);
    } finally {
        con.end();
    }

    return res.affectedRows > 0 ? true : new Error('Challenge not found or impossible to delete');
};