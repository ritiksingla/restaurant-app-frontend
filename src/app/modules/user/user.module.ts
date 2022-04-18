// angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../shared/material.module';
// shared modules
import { SharedModule } from '../shared/shared.module';
// components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserEffect } from './user.effect';
import { userReducer } from './user.reducer';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		ReactiveFormsModule,
		UserRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		SharedModule,
		StoreModule.forFeature('user', userReducer),
		EffectsModule.forFeature([UserEffect]),
	],
})
export class UserModule {}
