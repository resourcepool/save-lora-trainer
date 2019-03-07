export const config = {
    // DB Config
    host: 'localhost',
    user: 'root',
    dbPassword: 'root',
    database: 'lora',
    // API config
    apiPassword: 'loradmin',
    // LoraAppServer config
    loRaServer: {
        baseUrl: "https://loraas.save-lora.takima.io/api",
        authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.GVAd8NMkAZ3axU2flBJ9PbNY_R45tbu-VLLaxWAGwWI",
        rak811DevProfileId: "1d99a006-e617-4fb3-9ffe-a71567ee36a7",
        loRaApplicationId: 1,
        targetNwkKey: "42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42"
    },
    // Mock device config
    mockDevice: {
        appEUI: "42:42:42:42:42:42:42:42",
        devEUI: "13:37:00:00:FF:FF:FF:FF",
        appKey: "2E:A2:9C:4F:54:15:A0:0C:CA:4A:CE:B3:F2:B2:44:69"
    },
    mockClient: {
        clientId: 'gotham-watchdog'
    }
};
