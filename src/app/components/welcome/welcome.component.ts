import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import {State, getThemeState} from '../../app.state';

@Component({
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
	pageTitle = 'Welcome';
	theme$!: Observable<boolean>;
	constructor(private store: Store<State>) {}
	ngOnInit(): void {
		this.theme$ = this.store.select(getThemeState);
	}
}
