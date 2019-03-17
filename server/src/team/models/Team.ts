import Progress from "../../progress/models/Progress";

export default class Team {
    id?: number;
    name?: string;
    devEUI?: string;
    clientId?: string;
    progress: Progress;
    secretLocation?: {lat: number, lng: number};

    constructor() {
        this.progress = new Progress();
    }

    static fromDto(dto: {
        id: number,
        name: string,
        devEUI: string,
        clientId: string,
        progress: string;
        secretLocation: string;
    }): Team {
        let t = new Team();
        t.id = dto.id;
        t.name = dto.name;
        t.devEUI = dto.devEUI;
        t.clientId = dto.clientId;
        t.progress = JSON.parse(dto.progress);
        t.secretLocation = JSON.parse(dto.secretLocation);
        return t;
    }
}
