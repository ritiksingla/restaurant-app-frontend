import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadDishes } from './modules/dish/dish.action';
import { State } from './modules/dish/dish.reducer';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Restaurant App';

	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	get auth(): boolean {
		return !!localStorage.getItem('jwt');
	}

	constructor(private store: Store<State>) { }
	ngOnInit(): void {
		if (this.auth) {
			this.store.dispatch(loadDishes());
		}
		if (!localStorage.getItem('theme'))
			localStorage.setItem('theme', 'light');
	}
	onClick(): void {
		if (this.darkTheme) {
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
		}
	}
}
