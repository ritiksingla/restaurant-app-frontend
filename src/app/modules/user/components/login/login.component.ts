// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// angular redux
import { Store } from '@ngrx/store';
import { loginUser } from '../../user.action';
import { State } from '../../user.reducer';

@Component({
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	userForm!: FormGroup;
	get darkTheme() {
		return localStorage.getItem('theme') === 'dark';
	}
	get f() {
		return this.userForm.controls;
	}
	constructor(private store: Store<State>, private fb: FormBuilder) {}
	ngOnInit(): void {
		this.userForm = this.fb.group({
			email: ['', [Validators.required, Validators.maxLength(100)]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(20),
				],
			],
		});
	}
	login(): void {
		if (this.userForm.valid) {
			this.store.dispatch(
				loginUser({
					email: this.f.email.value,
					password: this.f.password.value,
				})
			);
		}
	}
}
