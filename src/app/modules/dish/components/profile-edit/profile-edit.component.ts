// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// angular redux
import { Store } from '@ngrx/store';
// models
import { IUser } from '../../../user/models/IUser';
import { updateUser } from '../../../user/user.action';
import { State } from '../../../user/user.reducer';

@Component({
	templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
	currentUser!: IUser;
	userForm!: FormGroup;
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<State>,
		private fb: FormBuilder
	) {
		let user = localStorage.getItem('user');
		if (user) {
			this.currentUser = JSON.parse(user);
		}
	}

	ngOnInit() {
		this.userForm = this.fb.group({
			first_name: [
				this.currentUser.first_name,
				[Validators.required, Validators.maxLength(20)],
			],
			last_name: [
				this.currentUser.last_name,
				[Validators.required, Validators.maxLength(20)],
			],
			email: [
				this.currentUser.email,
				[
					Validators.required,
					Validators.email,
					Validators.maxLength(100),
				],
			],
		});
	}

	updateUser() {
		if (this.userForm.invalid) {
			return;
		}
		this.store.dispatch(
			updateUser({
				user: this.userForm.value,
				userId: this.currentUser._id,
			})
		);
	}
}
