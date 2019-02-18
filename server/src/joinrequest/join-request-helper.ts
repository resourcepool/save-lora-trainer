import * as utils from "../utils";
import JoinRequestBuilder from "./models/JoinRequestBuilder";
import btoa from 'btoa';

const MS_BTW_EPOCH_AND_GPS_EPOCH: number = new Date(1980, 0, 6, 0, 0, 0, 0).getTime();

export const randomValidTopic = (): string => {
    return 'gateway/' + randomValidGatewayMAC() + '/rx';
};

export const randomStatsTopic = (): string => {
    return 'gateway/' + randomValidGatewayMAC() + '/stats';
};

export const randomInvalidTopic = (): string => {
    let test = (Math.random() * 10) % 2;
    return (test === 1) ? 'gateway/' + randomValidGatewayMAC() + '/tx' : randomStatsTopic();
};

export const randomValidGatewayMAC = () => {
    let numbers: number[] = Array.from({length: 8}, () => Math.floor(Math.random() * 256));
    return utils.bytesToHexString(Uint8Array.from(numbers));
};

const randomValidEUI = () => {
    let numbers: number[] = Array.from({length: 8}, () => Math.floor(Math.random() * 256));
    return utils.bytesToPrettyHexString(numbers);
};

const randomValidKey = () => {
    let numbers: number[] = Array.from({length: 16}, () => Math.floor(Math.random() * 256));
    return utils.bytesToPrettyHexString(numbers);
};

const randomDevNOnce = () => {
    let numbers: number[] = Array.from({length: 2}, () => Math.floor(Math.random() * 256));
    return parseInt(utils.bytesToHexString(Uint8Array.from(numbers)), 16);
};

export const randomJoinRequest = (): { topic: string, message: string } => {
    return {
        topic: randomValidTopic(),
        message: new JoinRequestBuilder()
            .devNOnce(randomDevNOnce())
            .devEUI(randomValidEUI())
            .appEUI(randomValidEUI())
            .appKey(randomValidKey())
            .build(randomValidGatewayMAC())
    };

};

export const randomJoinRequestWrongMHDR = (): { topic: string, message: string } => {
    let jr = JSON.parse(new JoinRequestBuilder()
        .devNOnce(randomDevNOnce())
        .devEUI(randomValidEUI())
        .appEUI(randomValidEUI())
        .appKey(randomValidKey())
        .build(randomValidGatewayMAC()));
    let buf = Buffer.from(jr.phyPayload, 'base64');
    buf[0] = Math.floor(Math.random() * 256) & 0xFF;
    jr.phyPayload = btoa(utils.bytesToHexString(Uint8Array.from(buf)));
    return {
        topic: randomValidTopic(),
        message: JSON.stringify(jr)
    };
};

export const randomStatsRequest = (): { topic: string, message: string } => {
    return {
        topic: randomStatsTopic(),
        message: JSON.stringify({
            "mac": "b827ebfffe66de4b",
            "time": new Date().toISOString(),
            "latitude": 48.0 + Math.random(),
            "longitude": 2.0 + Math.random(),
            "altitude": 120 + Math.floor(Math.random() * 10),
            "rxPacketsReceived": 10 + Math.floor(Math.random() * 10),
            "rxPacketsReceivedOK": Math.floor(Math.random() * 10),
            "txPacketsReceived": 0,
            "txPacketsEmitted": 0
        })
    };
};

export const randomOtherRequest = (): { topic: string, message: string } => {
    return {
        topic: randomValidTopic(),
        message: JSON.stringify({
            "rxInfo": randomRxInfo(randomValidGatewayMAC(), 25), "phyPayload": "QOTwRQ6APAICXJDIy+Dv/TICXJQ582zYFw=="
        })
    };
};

export const randomRequest = (): { topic: string, message: string } => {
    let randomize = Math.floor(Math.random() * 4);
    switch (randomize) {
        case 0:
            return randomJoinRequest();
        case 1:
            return randomJoinRequestWrongMHDR();
        case 2:
            return randomStatsRequest();
        case 3:
            return randomOtherRequest();
        default:
            return randomJoinRequest();
    }
};

export const randomRxInfo = (gatewayMAC: string = randomValidGatewayMAC(), size: number) => {
    let date = new Date();
    let randomize = Math.random() * 5;
    return {
        mac: gatewayMAC,
        time: date.toISOString(),
        timeSinceGPSEpoch: computeGPSEpochString(date),
        timestamp: Math.floor(date.valueOf() / 1000),
        frequency: 867300000,
        channel: Math.floor(Math.random() * 5),
        rfChain: 0,
        crcStatus: 1,
        codeRate: (randomize % 2 === 0) ? "5/5" : "4/5",
        rssi: -Math.floor(90 + Math.random() * 20),
        loRaSNR: -20 + Math.floor(Math.random() * 3),
        size: size,
        dataRate: {modulation: "LORA", spreadFactor: 12, bandwidth: 125},
        board: 0,
        antenna: 0
    };
};

export const computeGPSEpochString = (date: Date): string => {
    let msSinceEpoch = date.getTime();
    let msSinceGPSEpoch = msSinceEpoch - MS_BTW_EPOCH_AND_GPS_EPOCH;
    let secondsSinceGPSEpoch = Math.floor(msSinceGPSEpoch / 1000);
    let minutesSinceGPSEpoch = Math.floor(secondsSinceGPSEpoch / 60);
    let hoursSinceGPSEpoch = Math.floor(minutesSinceGPSEpoch / 60);
    return hoursSinceGPSEpoch + 'h' + (minutesSinceGPSEpoch - (hoursSinceGPSEpoch * 60)) + 'm' + ((secondsSinceGPSEpoch - (minutesSinceGPSEpoch * 60))) + '.' + (msSinceGPSEpoch - secondsSinceGPSEpoch * 1000 + 's');
};
