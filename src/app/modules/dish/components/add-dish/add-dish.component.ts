import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from '../../dish.reducer';
import { IDish } from '../../models/IDish';
import { DishService } from '../../dish.service';
import * as DishActions from '../../dish.action';
import { IUser } from '../../../user/models/IUser';

@Component({
	templateUrl: './add-dish.component.html'
})
export class AddDishComponent implements OnInit {
	_id: string = '';
	name: string = '';
	imageUrl: string = '';
	description: string = '';
	price: number = 0;
	category: string = '';
	label: string = '';
	user: IUser = {
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	};
	error: string = '';
	btnTitle: string = 'Add';
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}

	categories$: Observable<string[]>;
	labels$: Observable<string[]>;

	constructor(private router: Router, private route: ActivatedRoute,
		private service: DishService, private store: Store<State>) {
		let user = localStorage.getItem('user');
		if (user)
			{
				this.user = JSON.parse(user);
			}

		this.categories$ = this.service.categories$;
		this.labels$ = this.service.labels$;
	}

	ngOnInit(): void {
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
		}
	}
	onSubmit(f: NgForm): void {
		if (f.invalid) {
			return;
		}
		let newDish: IDish = {
			user: this.user,
			name: this.name,
			imageUrl: this.imageUrl,
			description: this.description,
			price: this.price,
			category: this.category,
			label: this.label,
			averageRating: 0,
			comments:[]
		};
		if (this._id.length > 0) {
			this.store.dispatch(DishActions.updateDish({
				_id: this._id,
				updatedDish: newDish
			}));
		} else {
			this.store.dispatch(DishActions.addDish({ newDish }));
		}
		this.router.navigate(['/menu']);
	}
}
