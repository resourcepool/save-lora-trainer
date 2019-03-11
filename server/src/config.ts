export const config = {
    // DB Config
    host: 'localhost',
    user: 'root',
    dbPassword: 'root', // FIXME
    database: 'lora', // FIXME
    // BEGIN SAVELORA Client config
    proxySecret: 'IAmTheGodOfGothamAndThisPasswordIsSeri0u$', // JWT <=> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiVHJpbml0eSIsImlhdCI6MTU0NjI5NzIwMH0.0Zx2AjfAxh9uCOAfZc1vU8NYAL9f2jbarjcLG4_G9ck
    publicSecret: 'Not so secret... Or is it?', // JWT <=> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDEiLCJuYW1lIjoiUHVibGljIElkaW90IiwiaWF0IjoxNTQ2Mjk3MjAwfQ.C7S62jkn05WNwMZ6dRRrIGPOxMVwOPl3rRuQ1Y4-rTg
    // END SAVELORA Client config
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
    // BEGIN MQTT Client config
	mqttClient: {
		clientId: 'gotham-watchdog',
		host: 'mqtts://broker.save-lora.resourcepool.io:8883',
		username: 'admin',
		password: 'PndxCFsgXLW72tFwQ1yvZHyvTWcTOMMd'
	},
    // END MQTT Client config
};
