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
    proxySecret: 'IAmTheGodOfGothamAndThisPasswordIsSeri0u$',
    publicSecret: 'Not so secret... Or is it?',
    adminSecret: "U9KXC8INT4uQKbOPRc7Gm9rVpbH9BsRtyteQqZ7etKJFu7JJBA9qIeW5ZXwJoN40",
    // END SAVELORA Client config
    loRaServer: {
        baseUrl: "https://loraas.save-lora.takima.io/api",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.8zglscHAcCa_pZw-0k1sP0vn_FcwnshbTzWBfaaGjCM",
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
        password: '1qKbLaPmLnhCAAlC7Tde3VLiWrMfLrah'
    },
    // END MQTT Client config
};
