import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {of, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as UserReducer from './modules/user/user.reducer';
import * as UserAction from './modules/user/user.action';
import {State} from './modules/dish/dish.reducer';
import {loadDishes} from './modules/dish/dish.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Restaurant App';

	get darkTheme():boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	get auth():boolean {
		return localStorage.getItem('jwt') !== null;
	}

	constructor(private router: Router, private store: Store<State>,
		private userStore: Store<UserReducer.State>) {}
	ngOnInit(): void {
		if (this.auth) {
			this.store.dispatch(loadDishes());
		}
		if(localStorage.getItem('theme') === null)
			localStorage.setItem('theme', 'light');
	}
	onClick():void {
		if(this.darkTheme) {
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
		}
	}

	logout(): void {
		localStorage.clear();
		this.userStore.dispatch(UserAction.logoutUser());
		this.router.navigate(['/login']);
	}
}
