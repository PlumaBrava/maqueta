import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthService } from './services/auth.service';
import { FiredatabaseService } from './services/firedatabase.service';



//Membership (inicio)
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MembershipComponent } from './membership/membership.component';
import { MembershipData } from './membership/membership.data';

//Membership (fin)

import { SharedModule } from '../shared/shared.module';


export const routes = [
 { path: 'login', component: LoginComponent, pathMatch: 'full' },
 // { path: '', redirectTo: 'users', pathMatch: 'full'},
{
      path: 'u', 
      component: UsersComponent,
      children:[
        // { path: '', redirectTo: 'users', pathMatch: 'full'},
        { path: 'projects', component: LoginComponent, data: { breadcrumb: 'Projects' } },
        { path: 'user-info', component: UserInfoComponent, data: { breadcrumb: 'Información del usuario' } },
        { path: 'membership', component: MembershipComponent,data: { breadcrumb: 'Membership' } }
      ]
  }

 
  // { path: 'user-info', component: UserInfoComponent, data: { breadcrumb: 'User Information3' } }
];

@NgModule({
  declarations: [
  	UsersComponent,
  	LoginComponent,
  	UserMenuComponent,
  	UserInfoComponent,
  	MembershipComponent
  	],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    //Memebershio (Inicio)
       HttpClientModule,
    InMemoryWebApiModule.forRoot(MembershipData, { delay: 0 }),
    // RouterModule.forChild(routes),
    // FormsModule,
    // ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule,
    //Memebershio (Fin)
	SharedModule 

  	],

  exports: [
  	UsersComponent,
    LoginComponent,
    UserMenuComponent,
    UserInfoComponent,
    MembershipComponent
  	],
  providers: [
  	AuthService,FiredatabaseService
	]
})
export class UsersModule { }


