import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { User, Meme, MemePage } from '@app/_models';
import { UserService, MemeService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    memePage: MemePage;

    constructor(
        private userService: UserService,
        private memeService: MemeService) { }

    ngOnInit() {
        this.loading = true;
        this.memeService.getMemesPage(1).subscribe(memePage => {
            this.loading = false;
            this.memePage = memePage;
        });
    }
}