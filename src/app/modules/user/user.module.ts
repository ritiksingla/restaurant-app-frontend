import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import {userReducer} from './user.reducer';
import { EffectsModule } from '@ngrx/effects';
import {UserEffect} from './user.effect';
import {UserGuard} from './user.guard';

const userRoutes: Routes = [
	{ path: 'user/login', canActivate:[UserGuard], component: LoginComponent },
	{ path: 'user/register',canActivate:[UserGuard], component: RegisterComponent },
];

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		RouterModule.forChild(userRoutes),
		SharedModule,
		StoreModule.forFeature('user', userReducer),
		EffectsModule.forFeature([UserEffect])
	]
})
export class UserModule { }