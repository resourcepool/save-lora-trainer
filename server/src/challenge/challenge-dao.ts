import Challenge from './models/Challenge';
import {dbInstance} from '../web/utils/db-config';

export const findOne = async (id: number): Promise<Challenge | undefined> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM challenge WHERE id = ?`, id);
    } finally {
        con.end();
    }
    return rows.length > 0 ? Challenge.fromDto(rows[0]) : undefined;
};

export const create = async (challenge: Challenge): Promise<Challenge> => {
    const con = await dbInstance();
    let res;
    try {
        let dto = {
            id: challenge.id,
            tag: challenge.tag,
            teamId: challenge.teamId,
            content: JSON.stringify(challenge.content)
        };
        res = await con.query('INSERT INTO challenge SET ?', dto);
    } finally {
        con.end();
    }
    if (res.affectedRows === 0) {
        throw new Error("Failed to add challenge");
    }
    challenge.id = res.insertId;
    return challenge;
};

export const deleteOne = async (id: number): Promise<boolean> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`DELETE FROM challenge WHERE id = ?`, id);
    } finally {
        con.end();
    }
    return res.affectedRows > 0;
};