import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoint } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post<User>(endpoint.registerUser, user);
    }
}
