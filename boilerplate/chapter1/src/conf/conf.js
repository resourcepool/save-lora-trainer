/**
 * Step 3
 * TODO Change this configuration with the one provided during your registration
 * @type {{}}
 */
const CHANGEME = {
  clientId: 'hacker-1234',
  appEUI: '42:42:42:42:42:42:42:42',
  nwkKey: '42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42',
  deviceEUI: '13:37:00:00:FF:FF:FF:00',
  progressApiKey: 'jaimelespates'
};

module.exports = {
  loRaServer: {
    baseUrl: 'http://localhost:3333/api/proxy',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiVHJpbml0eSIsImlhdCI6MTU0NjI5NzIwMH0.0Zx2AjfAxh9uCOAfZc1vU8NYAL9f2jbarjcLG4_G9ck',
    rak811DevProfileId: '1d99a006-e617-4fb3-9ffe-a71567ee36a7',
    loRaApplicationId: 1,
  },
  progressClient: {
    baseUrl: 'http://localhost:3333/api/public',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDEiLCJuYW1lIjoiUHVibGljIElkaW90IiwiaWF0IjoxNTQ2Mjk3MjAwfQ.C7S62jkn05WNwMZ6dRRrIGPOxMVwOPl3rRuQ1Y4-rTg'
  },
  user: CHANGEME
};
