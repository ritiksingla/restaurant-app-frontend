import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as DishActions from '../../dish.action';
import * as DishReducer from '../../dish.reducer';
import { IDish } from '../../models/IDish';



@Component({
	templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {
	dishes$!: Observable<IDish[]>;
	private listFilterSubject = new BehaviorSubject<string>('');
	listFilterAction$ = this.listFilterSubject.asObservable();
	filteredDishes$: Observable<IDish[]> = of([]);

	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}

	constructor(private router: Router, private route: ActivatedRoute,
		private store: Store<DishReducer.State>) { }

	ngOnInit(): void {
		this.dishes$ = this.store.select(DishReducer.getDishesState);
		this.filteredDishes$ = combineLatest([this.dishes$, this.listFilterAction$]).pipe(
			map(([dishes, filterString]) =>
				dishes.filter(dish => dish.name.toLowerCase().includes(filterString.toLowerCase()))
			)
		);
	}
	onFilterChange(x: any) {
		this.listFilterSubject.next(x.target.value);
	}
	onDishClicked(dish: IDish): void {
		if (dish._id) {
			this.store.dispatch(DishActions.selectDish({ dish }));
			this.router.navigate(['/menu', dish._id]);
		}
	}
}
