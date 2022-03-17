import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './modules/dish/reducers/menu.reducer';
import * as MenuActions from './modules/dish/actions/menu.action';
import {ThemeAction, getThemeState} from './app.state';
import {of, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as UserReducer from './modules/user/user.reducer';
import * as UserAction from './modules/user/user.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Restaurant App';
	theme$: Observable<boolean> = of(false);
	get auth():boolean {
		return localStorage.getItem('jwt') !== null;
	}

	constructor(private router: Router, private store: Store<State>,
		private userStore: Store<UserReducer.State>) {}
	ngOnInit(): void {
		if(this.auth === true)
			this.store.dispatch(MenuActions.loadDishes());
		this.theme$ = this.store.select(getThemeState);
		this.theme$.subscribe(theme => {
			if(theme) {
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'light');
			}
		});
	}
	onClick():void {
		this.store.dispatch(ThemeAction());
	}

	logout(): void {
		localStorage.clear();
		this.userStore.dispatch(UserAction.logoutUser());
		this.router.navigate(['/login']);
	}
}
