import {normalizeHexString} from "../../utils";

export default class GpsLocationPacket {
    devEUI: string;
    latitude: number;
    longitude: number;
    altitude: number;

    constructor(devEUI: string, gpsLocation: {latitude: number, longitude: number, altitude: number}) {
        this.devEUI = normalizeHexString(devEUI);
        this.latitude = gpsLocation.latitude;
        this.longitude = gpsLocation.longitude;
        this.altitude = gpsLocation.altitude;
    }
}
