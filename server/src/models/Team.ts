import Progress from "./Progress";

export default class Team {
    id?: number;
    name?: string;
    devEUI?: string;
    clientId?: string;
    progress: Progress;
    
    constructor() {
        this.progress = new Progress();
    }
}