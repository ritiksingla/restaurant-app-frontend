// angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import * as DishActions from '../../dish.action';
import { State } from '../../dish.reducer';

// rxjs
import { Observable } from 'rxjs';

// models
import { IUser } from '../../../user/models/IUser';
import { IDish } from '../../models/IDish';

// services
import { DishService } from '../../dish.service';

@Component({
	templateUrl: './add-dish.component.html',
})
export class AddDishComponent implements OnInit {
	private emptyUser: IUser = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	};
	private emptyDish: IDish = {
		_id: '',
		name: '',
		imageUrl: '',
		description: '',
		price: 0,
		category: '',
		label: '',
		averageRating: 0,
		comments: [],
		user: this.emptyUser,
	};

	currentDish: IDish = Object.assign({}, this.emptyDish);
	currentUser: IUser = this.emptyUser;
	btnTitle: string = 'Add';
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}

	private _submitted = false;
	get submitted(): boolean {
		return this._submitted;
	}

	get isDirty(): boolean {
		if (this.submitted) return false;
		// match anything except comments and user
		let x = JSON.stringify(this.currentDish);
		let y = JSON.stringify(this.emptyDish);
		return x !== y;
	}

	categories$: Observable<string[]>;
	labels$: Observable<string[]>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private service: DishService,
		private store: Store<State>
	) {
		let currentUser = localStorage.getItem('user');
		if (currentUser) this.currentUser = JSON.parse(currentUser);
		this.categories$ = this.service.categories$;
		this.labels$ = this.service.labels$;
	}

	ngOnInit(): void {
		if (this.route.snapshot.queryParamMap.keys.length > 0) {
			this.btnTitle = 'Update';
			let paramMap: ParamMap = this.route.snapshot.queryParamMap;
			if (paramMap.has('_id')) {
				this.currentDish._id = String(paramMap.get('_id'));
			}
			if (paramMap.has('name')) {
				this.currentDish.name = String(paramMap.get('name'));
			}
			if (paramMap.has('imageUrl')) {
				this.currentDish.imageUrl = String(paramMap.get('imageUrl'));
			}
			if (paramMap.has('description')) {
				this.currentDish.description = String(
					paramMap.get('description')
				);
			}
			if (paramMap.has('category')) {
				this.currentDish.category = String(paramMap.get('category'));
			}
			if (paramMap.has('label')) {
				this.currentDish.label = String(paramMap.get('label'));
			}
			if (paramMap.has('price')) {
				this.currentDish.price = Number(paramMap.get('price'));
			}
		}
	}
	onSubmit(f: NgForm): void {
		if (f.invalid) {
			return;
		}
		if (f.submitted) {
			this._submitted = true;
		}
		if (this.currentDish._id && this.currentDish._id.length > 0) {
			// only provide value for updates
			this.store.dispatch(
				DishActions.updateDish({
					_id: this.currentDish._id,
					updatedDish: this.currentDish,
				})
			);
		} else {
			this.currentDish.user = this.currentUser;
			this.store.dispatch(
				DishActions.addDish({ newDish: this.currentDish })
			);
		}
		this.router.navigate(['/menu']);
	}
}
