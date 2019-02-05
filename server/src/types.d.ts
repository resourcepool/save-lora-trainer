declare module 'node-aes-cmac' {
    export function aesCmac(key: Buffer|string, message: Buffer|string): string;
}
declare module 'btoa' {
    export default function (str: string): string;
}