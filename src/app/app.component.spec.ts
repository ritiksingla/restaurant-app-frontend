import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/shared/material.module';
import { SharedModule } from './modules/shared/shared.module';

describe('App Component', () => {
	let mockStore;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		mockStore = jasmine.createSpyObj(['dispatch']);
		await TestBed.configureTestingModule({
			imports: [SharedModule, MaterialModule, BrowserAnimationsModule],
			declarations: [AppComponent],
			providers: [{ provide: Store, useValue: mockStore }],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
	});
	it('should render app component', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
