import Progress from "../progress/Progress";

export default class Team {
    id?: number;
    name?: string;
    devEUI?: string;
    clientId?: string;
    progress: Progress;

    constructor() {
        this.progress = new Progress();
    }

    static fromDto(dto: {
        id: number,
        name: string,
        devEUI: string,
        clientId: string,
        progress: string;
    }): Team {
        let t = new Team();
        t.id = dto.id;
        t.name = dto.name;
        t.devEUI = dto.devEUI;
        t.clientId = dto.clientId;
        t.progress = JSON.parse(dto.progress);
        return t;
    }
}