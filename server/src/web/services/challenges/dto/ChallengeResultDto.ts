export default class ChallengeResultDto {
    challengeId?: number;
    errors?: string[];
    content?: {
        messages: {supported: boolean, decodedPacket?: string}[]
    };
}