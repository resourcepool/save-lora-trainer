export default class Step {
    tag: string;
    validated: boolean;
    timestamp?: number;
    
    constructor(tag: string) {
        this.tag = tag;
        this.validated = false;
    }
}