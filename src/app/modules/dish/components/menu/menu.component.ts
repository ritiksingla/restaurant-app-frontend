import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, tap, map, take, toArray } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IDish } from '../../model/IDish';
import { State } from '../../reducers/menu.reducer';
import * as MenuReducer from '../../reducers/menu.reducer';
import * as MenuActions from '../../actions/menu.action';

@Component({
	templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, OnDestroy, OnChanges {
	dishes$!: Observable<IDish[]>;
	filteredDishes$!: Observable<IDish[]>;
	error$!: Observable<string>;
	private _listFilter!: string;
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value
		this.performFilter(value);
	}

	constructor(private router: Router, private store: Store<State>) { }

	ngOnInit(): void {
		console.log('OnInit');
		// Do NOT subscribe here because it uses an async pipe
		// This gets the initial values until the load is complete.
		this.dishes$ = this.store.select(MenuReducer.getDishesState);
		this.store.select(MenuReducer.getListFilterState)
			.subscribe(listFilter => this._listFilter = listFilter);
		// Do NOT subscribe here because it uses an async pipe
		this.filteredDishes$ = this.store.select(MenuReducer.getFilteredDishesState);
	}

	ngOnChanges(): void { console.log('OnChanges'); }
	ngOnDestroy(): void { console.log('OnDestroy'); }

	matchSubstringCaseInsensitive(value: string): IDish[] {
		let localFilteredDishes: IDish[] = [];
		this.dishes$.subscribe(dishes => {
			localFilteredDishes = dishes;
			localFilteredDishes = localFilteredDishes.filter(d => {
				return d.name.toLowerCase().includes(value);
			});
		});
		return localFilteredDishes;
	}
	performFilter(value: string): void {
		this.store.dispatch(MenuActions.filteredDishesAction({
			filteredDishes: this.matchSubstringCaseInsensitive(value.toLowerCase())
		}));
	}

	onDishClicked(dish: IDish): void {
		this.store.dispatch(MenuActions.selectDish({dish}));
		if (dish._id)
			this.router.navigate(['/menu', dish._id]);
	}
}
