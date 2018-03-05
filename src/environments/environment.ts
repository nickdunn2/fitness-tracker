// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDTPzxWucESJswS4YkNCXlA04AYVpSkIRE',
    authDomain: 'angular-fitness-tracker-815c8.firebaseapp.com',
    databaseURL: 'https://angular-fitness-tracker-815c8.firebaseio.com',
    projectId: 'angular-fitness-tracker-815c8',
    storageBucket: 'angular-fitness-tracker-815c8.appspot.com',
    messagingSenderId: '613776602902'
  }
}
