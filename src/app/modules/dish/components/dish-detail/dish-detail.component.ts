import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { State } from '../../reducers/menu.reducer';
import { IDish } from '../../model/IDish';
import { DishService } from '../../service/dish.service';
import * as MenuReducer from '../../reducers/menu.reducer';
import * as MenuActions from '../../actions/menu.action';
import {getThemeState} from '../../../../app.state';

@Component({
	templateUrl: './dish-detail.component.html'
})
export class DishDetailComponent implements OnInit {
	pageTitle: string = 'Dish Detail';
	dish$!: Observable<IDish>;
	theme$!: Observable<boolean>;

	constructor(private _location: Location,
		private router: Router, private store: Store<State>) { }

	ngOnInit(): void {
		this.dish$ = this.store.select(MenuReducer.getSelectedDishState);

		this.theme$ = this.store.select(getThemeState);
	}
	onBack(): void {
		// make another request instead of actual back
		// this.router.navigate(['/menu'])
		this._location.back();
	}
	onDelete(id?: string): void {
		this.store.dispatch(MenuActions.deleteDish({ id: String(id) }));
		this.router.navigate(['/menu']);
	}
	onEdit(editDish: IDish): void {
		this.router.navigate(['/menu/add'], { queryParams: editDish });
	}
}