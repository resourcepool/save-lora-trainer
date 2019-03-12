import { dbInstance } from '../../../web/utils/db-config';

export const getDate = async (): Promise<Date|null> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT game_date FROM game_date LIMIT 1`);
    } finally {
        con.end();
    }
    if (rows.length === 0) {
        return null;
    }

    return rows[0].game_date || null;
};

export const setDate = async (date: Date): Promise<Date|null> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`UPDATE game_date SET game_date = ?`, date);
    } finally {
        con.end();
    }
    return date;
};
