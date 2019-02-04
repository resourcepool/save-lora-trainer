import JoinRequestPacketDecoder from "../models/JoinRequestPacketDecoder";
import Logger from '../log/logger';
const logger = Logger.child({service: "mqtt-rx-handler"});

export const handleRxMessage = (topic: string, message: Buffer) => {
    // Check Join Request Packets
    let joinRequestPacketDecoder = new JoinRequestPacketDecoder(topic, message);
    if (joinRequestPacketDecoder.isSupported()) {
        logger.info("Join Request Received: " + JSON.stringify(joinRequestPacketDecoder.decode()));
    }
};
