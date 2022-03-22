import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from '../../../user/models/IUser';
import { logoutUser } from '../../../user/user.action';
import { State } from '../../../user/user.reducer';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
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
	ngOnInit(): void {
	}

	logout(): void {
		localStorage.clear();
		this.userStore.dispatch(logoutUser());
		this.router.navigate(['/login']);
	}
}
