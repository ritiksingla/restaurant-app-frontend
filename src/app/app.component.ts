// angular
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// angular redux
import { Store } from '@ngrx/store';
import { loadDishes } from './modules/dish/dish.action';
import { State } from './modules/dish/dish.reducer';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	pageTitle = 'Restaurant App';
	public isScreenSmall!: boolean;

	opened = true;
	@ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}
	get auth(): boolean {
		return !!localStorage.getItem('jwt');
	}
	constructor(
		private store: Store<State>,
		private breakpointObserver: BreakpointObserver
	) {
		if (!localStorage.getItem('theme'))
			localStorage.setItem('theme', 'light');
	}

	ngOnInit(): void {
		if (this.auth) {
			this.store.dispatch(loadDishes());
		}
		if (window.innerWidth < 768) {
			this.sidenav.fixedTopGap = 55;
			this.opened = false;
		} else {
			this.sidenav.fixedTopGap = 55;
			this.opened = true;
		}
	}
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		if (event.target.innerWidth < 768) {
			this.sidenav.fixedTopGap = 55;
			this.opened = false;
		} else {
			this.sidenav.fixedTopGap = 55;
			this.opened = true;
		}
	}
	onThemeChange(checked: boolean) {
		if (checked) {
			localStorage.setItem('theme', 'dark');
		} else {
			localStorage.setItem('theme', 'light');
		}
	}
}
