/**
 * Step 3
 * TODO Change this configuration with the one provided during your registration
 * @type {{}}
 */
const CHANGEME = {
  appEUI: '42:42:42:42:42:42:42:42',
  nwkKey: '42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42',
  deviceEUI: '13:37:00:00:FF:FF:FF:00',
};

module.exports = {
  loRaServer: {
    baseUrl: 'http://localhost:8080/api',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.GVAd8NMkAZ3axU2flBJ9PbNY_R45tbu-VLLaxWAGwWI',
    rak811DevProfileId: '1d99a006-e617-4fb3-9ffe-a71567ee36a7',
    loRaApplicationId: 1,
  },
  progressClient: {
    baseUrl: 'http://localhost:3333',
  },
  user: CHANGEME
};
