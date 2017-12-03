import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsereditComponent } from './useredit/useredit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddCreditComponent } from './addcredit/addcredit.component';
import { BusyComponent } from './busy/busy.component';
import { BusyService } from './busy.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'transactions/:uid', component: TransactionsComponent, canActivate: [LoginGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [LoginGuard] },
  { path: 'useredit/:id', component: UsereditComponent, canActivate: [LoginGuard] },
  { path: 'useredit', component: UsereditComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'addcredit/:uid', component: AddCreditComponent, canActivate: [AdminGuard] },
  { path: 'addcredit', component: AddCreditComponent, canActivate: [AdminGuard] },
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
    UsersComponent,
    UsereditComponent,
    TransactionsComponent,
    AddCreditComponent,
    BusyComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireAuth, AngularFireDatabase, UserService, BusyService, LoginGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
