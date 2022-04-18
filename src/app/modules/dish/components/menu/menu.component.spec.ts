import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import DataDishes from '../../../shared/data/DataDishes.json';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
// models
import { IDishWithUserAndComments } from '../../models/IDish';
import { MenuComponent } from './menu.component';

describe('Menu Component', () => {
	let mockRouter, mockStore;
	let fixture: ComponentFixture<MenuComponent>;

	const DISHES: IDishWithUserAndComments[] = DataDishes.dishes;

	beforeEach(() => {
		mockRouter = jasmine.createSpyObj(['navigate']);
		mockStore = jasmine.createSpyObj(['select', 'dispatch']);
		TestBed.configureTestingModule({
			imports: [SharedModule, BrowserAnimationsModule, MaterialModule],
			declarations: [MenuComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: Store, useValue: mockStore },
			],
		});
		fixture = TestBed.createComponent(MenuComponent);
		mockStore.select.and.returnValue(of(DISHES));
	});

	it('should render correct initial no of dishes in menu', () => {
		fixture.detectChanges();
		const rows = fixture.debugElement.queryAll(By.css('.mat-row'));
		expect(rows.length).toBe(DISHES.length);
	});

	it('should filter dishes correctly', fakeAsync(() => {
		fixture.detectChanges();
		const filterInput = 'cake';
		fixture.componentInstance.searchInput.setValue(filterInput);
		tick(1000);
		fixture.detectChanges();
		fixture.componentInstance.filteredDishes$.subscribe(dishes => {
			expect(dishes.length).toBe(1);
			for (const dish of dishes) {
				expect(dish.name.toLowerCase()).toContain(filterInput);
			}
		});
	}));

	it('should call correct method when clicked on dish', () => {
		fixture.detectChanges();
		spyOn(fixture.componentInstance, 'onDishClicked');
		const rows = fixture.debugElement.queryAll(By.css('.mat-row'));
		rows[0].triggerEventHandler('click', null);
		expect(fixture.componentInstance.onDishClicked).toHaveBeenCalledWith(
			DISHES[0]
		);
	});

	it('should render correct data in table', () => {
		fixture.detectChanges();
		const rows = fixture.debugElement.queryAll(By.css('.mat-cell'));
		expect(rows.length).toBe(4 * DISHES.length);
		for (let i = 0; i < DISHES.length; ++i) {
			expect(rows[i * 4].nativeElement.textContent).toContain(
				DISHES[i].name
			);
			expect(rows[i * 4 + 1].nativeElement.textContent).toContain(
				DISHES[i].category
			);
			expect(rows[i * 4 + 2].nativeElement.textContent).toContain(
				DISHES[i].price
			);
			expect(rows[i * 4 + 3].nativeElement.textContent).toContain(
				DISHES[i].description
			);
		}
	});
});
