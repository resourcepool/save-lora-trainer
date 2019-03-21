export interface Team {
    id?: number;
    name: string;
    devEUI: string;
    clientId?: string;
    progress?: Progress;
    score?: number;
    secretLocation?: Location;
}

export interface Progress {
    hackerSteps: Step[];
    geekInDangerSteps: Step[];
}

export interface Step {
    validated: boolean;
    tag: string;
    timestamp?: number;
}

/** PRIVATE **/
interface Location {
    lat: number;
    lng: number;
}
