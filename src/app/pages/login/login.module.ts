import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from './services/firebase/auth.service';
import { FiredatabaseService } from './services/firebase/firedatabase.service';
import {MensajesService} from './services/mensajes/mensajes.service';
export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
   providers: [ 
   
    AuthService, 
    MensajesService,
    FiredatabaseService

  ],
})

export class LoginModule { }