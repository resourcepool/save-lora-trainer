import Team from "../team/Team";

export default class Challenge {
    id?: number;
    teamId?: number;
    devEUI?: string;
    tag?: string;
    content: any;
    
    constructor(tag?: string, team?: Team, content?: Object) {
        this.tag = tag;
        if (team) {
            this.teamId = team.id;
            this.devEUI = team.devEUI;    
        }
        this.content = content || {};
    }

    static fromDto(dto: {
        id?: number;
        teamId?: number;
        devEUI?: string;
        tag?: string;
        content?: string;
    }): Challenge {
        let t = new Challenge();
        t.id = dto.id;
        t.teamId = dto.teamId;
        t.devEUI = dto.devEUI;
        t.tag = dto.tag;
        t.content = JSON.parse(dto.content!);
        return t;
    }
}