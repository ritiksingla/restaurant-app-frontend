import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../app.state';

@Component({
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
	pageTitle = 'Welcome';
	get darkTheme():boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	constructor(private store: Store<State>) {}
	ngOnInit(): void {}
}
