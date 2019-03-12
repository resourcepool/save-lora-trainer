export const config = {
    // DB Config
    db: {
        host: 'localhost',
        user: 'root',
        password: 'root', // FIXME
        database: 'lora', // FIXME
    },
    team: {
        targetBBox: [2.10, 48.76, 2.60, 48.94], // [W,S,E,N]
        devEUIPrefix: "13:37:00:00"
    },
    admin: {
        username: "admin",
        password: "password"
    },
    // BEGIN SAVELORA Client config
    proxySecret: 'IAmTheGodOfGothamAndThisPasswordIsSeri0u$', // JWT <=> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiVHJpbml0eSIsImlhdCI6MTU0NjI5NzIwMH0.0Zx2AjfAxh9uCOAfZc1vU8NYAL9f2jbarjcLG4_G9ck
    publicSecret: 'Not so secret... Or is it?', // JWT <=> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDEiLCJuYW1lIjoiUHVibGljIElkaW90IiwiaWF0IjoxNTQ2Mjk3MjAwfQ.C7S62jkn05WNwMZ6dRRrIGPOxMVwOPl3rRuQ1Y4-rTg
    adminSecret: "xf3xbW5U3AgQwnRRbmEjj15ULfUVrr2jztB31HKP8vv5z3bZXRH2FK4fQ711gHdsqq",
    // END SAVELORA Client config
    loRaServer: {
        baseUrl: "https://loraas.save-lora.takima.io/api",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.ZQbxBsjGgIenfxRGzQ6mOGMZ4dnIvIfwlZwXX9CisXI",
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
    // BEGIN MQTT Client config
    mqttClient: {
        clientId: 'gotham-watchdog',
        host: 'mqtts://broker.save-lora.takima.io:8883',
        username: 'admin',
        password: 'HyrvBWKPBRkAdhZmdhOETshhQXC4bcSM'
    },
    // END MQTT Client config
};
