import Team from "../../team/models/Team";

export class ChallengeContent {
    messages: { topic: string, message: string }[] = [];
}

export default class Challenge {
    id?: number;
    teamId?: number;
    tag?: string;
    content: ChallengeContent;

    constructor(tag?: string, team?: Team, content?: ChallengeContent) {
        this.tag = tag;
        if (team) {
            this.teamId = team.id;
        }
        this.content = content || new ChallengeContent();
    }

    static fromDto(dto: {
        id?: number;
        teamId?: number;
        tag?: string;
        content?: string;
    }): Challenge {
        let t = new Challenge();
        t.id = dto.id;
        t.teamId = dto.teamId;
        t.tag = dto.tag;
        t.content = JSON.parse(dto.content!);
        return t;
    }
}