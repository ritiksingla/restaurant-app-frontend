// angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import { logoutUser } from '../../../user/user.action';
import { State } from '../../../user/user.reducer';

// models
import { IUser } from '../../../user/models/IUser';

@Component({
	templateUrl: './profile.component.html',
})
export class ProfileComponent {
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	currentUser!: IUser;
	constructor(private router: Router, private userStore: Store<State>) {
		let user = localStorage.getItem('user');
		if (user) {
			this.currentUser = JSON.parse(user);
		}
	}

	logout(): void {
		localStorage.clear();
		this.userStore.dispatch(logoutUser());
		this.router.navigate(['/login']);
	}
}
