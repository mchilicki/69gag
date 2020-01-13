// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:8000/'
};

export const endpoint = {
    getMemePage: environment.apiUrl + 'allmeme/',
    apiRefresh: environment.apiUrl + 'api/refresh/',
    apiToken: environment.apiUrl + 'api/token/',
    comment: environment.apiUrl + 'comment/',
    like: environment.apiUrl + 'like/',
    deleteLike: environment.apiUrl + 'like/',
    addMeme: environment.apiUrl + 'meme/',
    getMeme: environment.apiUrl + 'meme/',
    registerUser: environment.apiUrl + 'user/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.