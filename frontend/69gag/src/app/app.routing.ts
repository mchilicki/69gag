import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { MemeDetailsComponent } from './meme-details';
import { AddMemeComponent } from './add-meme/add-meme.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'page/:pageNumber', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'meme/:id', component: MemeDetailsComponent },
    { path: 'addmeme', component: AddMemeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
