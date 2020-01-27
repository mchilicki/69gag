export const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:8000/',
    firebase: {
        apiKey: 'AIzaSyCyx7voYVyJRnSmx4Xse7DUu8P6nV_BPWM',
        authDomain: 'gag-6761d.firebaseapp.com',
        databaseURL: 'https://gag-6761d.firebaseio.com',
        projectId: 'gag-6761d',
        storageBucket: 'gag-6761d.appspot.com',
        messagingSenderId: '820871007640',
        appId: '1:820871007640:web:11c37fc8ad56354eb36fed'
    }
};

export const endpoint = {
    getMemePage: environment.apiUrl + 'allmeme/',
    apiRefresh: environment.apiUrl + 'api/refresh/',
    apiToken: environment.apiUrl + 'api/token/',
    comment: environment.apiUrl + 'comment/',
    like: environment.apiUrl + 'like/',
    meme: environment.apiUrl + 'meme/',
    registerUser: environment.apiUrl + 'user/',
    userInfo: environment.apiUrl + 'user_info/',
};
