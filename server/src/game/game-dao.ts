import { dbInstance } from '../web/utils/db-config';

export const getStartDate = async (): Promise<Date|null> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM game LIMIT 1`);
    } finally {
        con.end();
    }
    if (rows.length === 0 || !rows[0].startDate) {
        return null;
    }

    return rows[0].startDate;
};

export const startGame = async (date: Date): Promise<Date|null> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`INSERT INTO game SET ?`, {startDate: date});
    } finally {
        con.end();
    }
    return date;
};

export const deleteAll = async () => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`DELETE FROM game`);
    } finally {
        con.end();
    }
    return rows > 0;
};
