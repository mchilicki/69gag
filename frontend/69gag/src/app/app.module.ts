import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { environment } from '../environments/environment';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MemeComponent } from './meme';
import { LikesButtonsComponent } from './likes-buttons';
import { RegisterComponent } from './register/register.component';
import { MemeDetailsComponent } from './meme-details';
import { AddMemeComponent } from './add-meme/add-meme.component';
import { MemeCommentsComponent } from './meme-comments';


@NgModule({
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase, '69gag web'),
        AngularFireStorageModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MemeComponent,
        LikesButtonsComponent,
        RegisterComponent,
        MemeDetailsComponent,
        MemeCommentsComponent,
        AddMemeComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: StorageBucket, useValue: 'gag-6761d.appspot.com' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
