import Team from './models/Team';
import { dbInstance } from '../web/utils/db-config';
import {HTTP404Error} from "../web/utils/http-errors";
import {normalizeHexString} from "../utils";


export const findAll = async (): Promise<Team[]|null> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team`);
    } finally {
        con.end();
    }
    if (rows.length === 0) {
        return null;
    }

    let result: Team[] = [];
    for (const team of rows) {
        result = [...result, Team.fromDto(team)];
    }
    return result;
};

export const findOne = async (id: number): Promise<Team|undefined> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE id = ?`, id);
    } finally {
        con.end();
    }
    if (rows.length === 0) {
        return undefined;
    }
    return Team.fromDto(rows[0]);
};

export const findByClientId = async (clientId: string): Promise<Team|undefined> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE clientId = ?`, clientId);
    } finally {
        con.end();
    }
    if (rows.length === 0) {
        return undefined;
    }
    return Team.fromDto(rows[0]);
};

export const findByDevEUI = async (devEUI: string): Promise<Team|undefined> => {
    const con = await dbInstance();
    let rows;
    try {
        rows = await con.query(`SELECT * FROM team WHERE devEUI = ?`, devEUI);
    } finally {
        con.end();
    }
    if (rows.length === 0) {
        return undefined;
    }
    return Team.fromDto(rows[0]);
};


export const addTeam = async (team: Team): Promise<Team> => {
    const con = await dbInstance();
    let res;
    try {
        let dto = {
            id: team.id,
            name: team.name,
            clientId: team.clientId,
            devEUI: normalizeHexString(team.devEUI!),
            progress: JSON.stringify(team.progress)
        };
        res = await con.query('INSERT INTO team SET ?', dto);
    } finally {
        con.end();
    }
    if (res.affectedRows === 0) {
        throw new Error("Failed to add team");
    }
    team.id = res.insertId;
    return team;
};

export const updateProgress = async (team: Team): Promise<boolean> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`UPDATE team SET progress = ? WHERE id = ?`, [JSON.stringify(team.progress), team.id]);
    } finally {
        con.end();
    }
    return true;
};

export const deleteTeam = async (id: number): Promise<boolean> => {
    const con = await dbInstance();
    let res;
    try {
        res = await con.query(`DELETE FROM team WHERE id = ?`, id);
    } finally {
        con.end();
    }
    return res.affectedRows > 0;
};
