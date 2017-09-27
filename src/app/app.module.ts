import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';
import { UsersComponent } from './users/users.component';
import { AngularFireDatabase } from 'angularfire2/database';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    PageNotFoundComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireAuth, AngularFireDatabase, UserService, LoginGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
