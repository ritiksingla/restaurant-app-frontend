import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './modules/dish/reducers/menu.reducer';
import * as MenuActions from './modules/dish/actions/menu.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Restaurant App';
	constructor(private store: Store<State>) {}
	ngOnInit(): void {
		alert('OnInit app');
		this.store.dispatch(MenuActions.loadDishes());
	}
}
