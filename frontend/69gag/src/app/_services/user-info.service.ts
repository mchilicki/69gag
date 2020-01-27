import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoint } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
    constructor(private http: HttpClient) { }

    getCurrentUser() {
        return this.http.get<User>(endpoint.userInfo);
    }
}
