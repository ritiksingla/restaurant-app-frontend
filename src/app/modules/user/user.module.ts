import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEffect } from './user.effect';
import { UserGuard } from './user.guard';
import { userReducer } from './user.reducer';


const userRoutes: Routes = [{
	path: 'user',
	canActivate: [UserGuard],
	children: [
		{ path: '', redirectTo: 'login', pathMatch: 'full' },
		{ path: 'login', component: LoginComponent },
		{ path: 'register', component: RegisterComponent }
	]
}];

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