// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// guards
import { UserGuard } from './user.guard';

const userRoutes: Routes = [
	{
		path: 'user',
		canActivate: [UserGuard],
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(userRoutes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
