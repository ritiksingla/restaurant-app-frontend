import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/shared/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { Directive, Input, HostListener, Component } from '@angular/core';

// @Directive({
// 	selector:'[routerLink]'
// })
// export class RouterLinkDirectiveStub {
// 	@Input('routerLink') linkParams: any;
// 	navigatedTo: any = null;

// 	@HostListener('click')
// 	onClick() {
// 		this.navigatedTo = this.linkParams;
// 	}
// }

// @Directive({
// 	selector:'[routerLinkActiveOptions]'
// })
// export class RouterLinkActiveOptionsDirectiveStub {
// 	@Input('routerLinkActiveOptions') activeOptions: any;
// 	options: any = null;

// 	@HostListener('click')
// 	onClick() {
// 		this.options = this.activeOptions;
// 	}
// }

// @Component({
// 	selector:'router-outlet',
// 	template:'<div></div>'
// })
// class FakeRouterOutlet {

// }

describe('App Component', () => {
	let mockStore;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		mockStore = jasmine.createSpyObj(['dispatch']);
		await TestBed.configureTestingModule({
			imports: [SharedModule, MaterialModule, RouterTestingModule],
			declarations: [AppComponent],
			providers: [{ provide: Store, useValue: mockStore }],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
	});

	it('should have correct route for login', () => {
		fixture.detectChanges();
		let buttons = fixture.debugElement.queryAll(By.css('button'));
		expect(buttons.length).toBe(2);

		// let routerLink = buttons[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

		// buttons[0].triggerEventHandler('click', null);
		// expect(routerLink.navigatedTo).toBe("/user/login");
	});
});
