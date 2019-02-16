declare module 'node-aes-cmac' {
    export function aesCmac(key: Buffer|string, message: Buffer|string): string;
}
