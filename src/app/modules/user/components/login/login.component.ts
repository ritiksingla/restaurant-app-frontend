import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loginUser } from '../../user.action';
import { getErrorState, State } from '../../user.reducer';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	email: string = '';
	password: string = '';
	error$: Observable<string> = of('');
	get darkTheme() {
		return localStorage.getItem('theme') === 'dark';
	}
	constructor(private store: Store<State>) { }
	ngOnInit(): void {
		this.error$ = this.store.select(getErrorState);
	}
	onSubmit(f: NgForm): void {
		if (f.valid) {
			this.store.dispatch(loginUser({ email: this.email, password: this.password }));
		}
	}
}
