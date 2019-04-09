// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    apiUrl    : 'http://127.0.0.1:3333/api/public',
    apiAdminUrl: 'http://127.0.0.1:3333/api/admin',
    apiJwt    : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMDEiLCJuYW1lIjoiUHVibGljIElkaW90IiwiaWF0IjoxNTQ2Mjk3MjAwfQ.zxlPEx7FzRwd5BclXEN2foAYXqzhUEPmmlNZJ4nk9u0',
    name      : 'Save LoRa',
    accessToken: '2BpPnqJP2CblSjzRtGggeRwbvremkcbBlTJ1VlZR8RlaYrH7ZqOLEde5rFDz9WRk',
    checkEUIs: true,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
