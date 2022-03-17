import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import {IUser} from '../../models/IUser';
import {State, getAuthState} from '../../user.reducer';
import {loginUser} from '../../user.action';
import {Observable} from 'rxjs';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email: string = '';
	password: string = '';
	constructor(private store: Store<State>) {}
	ngOnInit(): void {
	}
	onSubmit(f: NgForm): void {
		this.store.dispatch(loginUser({email: this.email, password: this.password}));
	}
}
