export const environment = {
    production: true,
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
