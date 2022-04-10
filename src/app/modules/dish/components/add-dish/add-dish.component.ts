// angular
import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import * as DishActions from '../../dish.action';
import { State } from '../../dish.reducer';

// rxjs
import { Observable } from 'rxjs';

// models
import { IUser } from '../../../user/models/IUser';
import { IDishWithUserAndComments } from '../../models/IDish';

// services
import { DishService } from '../../dish.service';

@Component({
	templateUrl: './add-dish.component.html',
})
export class AddDishComponent implements OnInit {
	currentUser!: IUser;
	btnTitle: string = 'Add';
	dishForm!: FormGroup;
	dishId: string = '';
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	get f() {
		return this.dishForm.controls;
	}
	private _submitted = false;
	get submitted(): boolean {
		return this._submitted;
	}

	get isDirty(): boolean {
		if (this.submitted) return false;
		return this.dishForm.dirty;
	}

	categories$: Observable<string[]>;
	labels$: Observable<string[]>;

	constructor(
		private route: ActivatedRoute,
		private service: DishService,
		private store: Store<State>,
		private fb: FormBuilder
	) {
		let currentUser = localStorage.getItem('user');
		if (currentUser) this.currentUser = JSON.parse(currentUser);
		this.categories$ = this.service.categories$;
		this.labels$ = this.service.labels$;
	}

	ngOnInit(): void {
		this.dishForm = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(20)]],
			imageUrl: ['', [Validators.required]],
			description: ['', [Validators.required, Validators.maxLength(100)]],
			category: ['', [Validators.required]],
			label: ['', [Validators.required]],
			price: [0.0, [Validators.required, Validators.min(0)]],
		});
		let P: ParamMap = this.route.snapshot.queryParamMap;
		if (P.keys.length > 0) {
			this.btnTitle = 'Update';
			// Set form values for updating
			Object.keys(this.f).forEach(key => {
				this.f[key].setValue(P.get(key));
			});
			this.dishId = String(P.get('_id'));
		}
	}
	addOrUpdateDish(): void {
		if (this.dishForm.invalid) {
			return;
		}
		this._submitted = true;
		if (this.btnTitle === 'Update') {
			// only provide value for updates
			this.store.dispatch(
				DishActions.updateDish({
					_id: this.dishId,
					updatedDish: this.dishForm.value,
				})
			);
		} else {
			let newDish = { ...this.dishForm.value, user: this.currentUser };
			this.store.dispatch(DishActions.addDish({ newDish }));
		}
	}
}
