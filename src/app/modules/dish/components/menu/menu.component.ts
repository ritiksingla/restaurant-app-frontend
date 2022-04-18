// angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// angular redux
import { Store } from '@ngrx/store';
// rxjs
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
} from 'rxjs/operators';
import * as DishActions from '../../dish.action';
import * as DishReducer from '../../dish.reducer';
// models
import { IDishWithUserAndComments } from '../../models/IDish';

@Component({
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
	// all dishes loaded once per refresh
	dishes$!: Observable<IDishWithUserAndComments[]>;
	displayedColumns: string[] = ['name', 'category', 'price', 'description'];

	// search input
	private listFilterSubject = new BehaviorSubject<string>('');
	listFilterAction$ = this.listFilterSubject.asObservable();
	searchInput = new FormControl('');

	// filtered dishes using search input
	filteredDishes$: Observable<IDishWithUserAndComments[]> = of([]);

	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}

	constructor(
		private router: Router,
		private store: Store<DishReducer.State>
	) {}

	ngOnInit(): void {
		this.dishes$ = this.store.select(DishReducer.getDishesState);

		this.filteredDishes$ = combineLatest([
			this.dishes$,
			this.listFilterAction$,
		]).pipe(
			map(([dishes, filterString]) =>
				dishes.filter(dish => {
					return dish.name
						.toLowerCase()
						.includes(filterString.toLowerCase());
				})
			)
		);

		this.searchInput.valueChanges
			.pipe(
				filter(q => q.length > 2),
				debounceTime(1000),
				distinctUntilChanged()
			)
			.subscribe(q => this.listFilterSubject.next(q));
	}
	onDishClicked(dish: IDishWithUserAndComments): void {
		if (dish._id) {
			this.store.dispatch(DishActions.selectDish({ dish }));
			this.router.navigate(['/menu', dish._id]);
		}
	}
}
