import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from '../../reducers/menu.reducer';
import { IDish } from '../../model/IDish';
import { DishService } from '../../service/dish.service';
import * as MenuReducer from '../../reducers/menu.reducer';
import * as MenuActions from '../../actions/menu.action';
import {getThemeState} from '../../../../app.state';

@Component({
	templateUrl: './add-dish.component.html',
	styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
	_id: string = '';
	name: string = '';
	imageUrl: string = '';
	description: string = '';
	price: number = 0;
	category: string = '';
	label: string = '';
	starRating: number = 5;
	theme$!: Observable<boolean>;
	btnTitle: string = 'Add';
	constructor(private router: Router, private route: ActivatedRoute, private store: Store<State>) {}

	ngOnInit(): void {
		this.theme$ = this.store.select(getThemeState);
		
		if (this.route.snapshot.queryParamMap.keys.length > 0) {
			this.btnTitle = 'Update';
			let Map = this.route.snapshot.queryParamMap;
			if (Map.has('_id')) {
				this._id = String(Map.get('_id'));
			}
			if (Map.has('name')) {
				this.name = String(Map.get('name'));
			}
			if (Map.has('imageUrl')) {
				this.imageUrl = String(Map.get('imageUrl'));
			}
			if (Map.has('description')) {
				this.description = String(Map.get('description'));
			}
			if (Map.has('category')) {
				this.category = String(Map.get('category'));
			}
			if (Map.has('label')) {
				this.label = String(Map.get('label'));
			}
			if (Map.has('price')) {
				this.price = Number(Map.get('price'));
			}
			if (Map.has('starRating')) {
				this.starRating = Number(Map.get('starRating'));
			}
		}
	}
	onSubmit(f: NgForm): void {
		let newDish: IDish = {
			name: this.name,
			imageUrl: this.imageUrl,
			description: this.description,
			price: this.price,
			category: this.category,
			label: this.label,
			starRating: this.starRating
		};
		if (this._id.length > 0) {
			this.store.dispatch(MenuActions.updateDish({
				_id: this._id,
				updatedDish: newDish
			}));
		} else {
			this.store.dispatch(MenuActions.addDish({newDish}));
		}
		this.router.navigate(['/menu']);
	}
}
