import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../app.state';

@Component({
	templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
	pageTitle = 'Welcome';
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	constructor(private store: Store<State>) {}
}
