import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './modules/dish/reducers/menu.reducer';
import * as MenuActions from './modules/dish/actions/menu.action';
import {ThemeAction, getThemeState} from './app.state';
import {of, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Restaurant App';
	theme$: Observable<boolean> = of(false);

	constructor(private store: Store<State>) {}
	ngOnInit(): void {
		this.store.dispatch(MenuActions.loadDishes());
		this.theme$ = this.store.select(getThemeState);
	}
	onClick():void {
		this.store.dispatch(ThemeAction());
	}
}
