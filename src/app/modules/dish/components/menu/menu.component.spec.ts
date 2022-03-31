import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
// models
import { IDish } from '../../models/IDish';
import { MenuComponent } from './menu.component';


describe('Menu Component', () => {
	let mockRouter, mockStore;
	let fixture: ComponentFixture<MenuComponent>;

	let DISHES: IDish[];
	const emptyUser = {
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	};
	let Dish1: IDish = {
		_id: '1',
		name: 'dish1',
		imageUrl: 'https://www.images.com/dish1.png',
		category: 'pizza',
		label: 'spicy',
		price: 3.99,
		description: 'dish1 pizza spicy',
		averageRating: 3.69,
		user: emptyUser,
		comments: []
	};
	let Dish2: IDish = {
		_id: '2',
		name: 'dish2',
		imageUrl: 'https://www.images.com/dish2.png',
		category: 'chinese',
		label: 'hot',
		price: 5.99,
		description: 'dish2 pizza spicy',
		averageRating: 4.69,
		user: emptyUser,
		comments: []
	};
	let Dish3: IDish = {
		_id: '13',
		name: 'dish13',
		imageUrl: 'https://www.images.com/dish13.png',
		category: 'chinese',
		label: 'hot',
		price: 5.99,
		description: 'dish13 pizza spicy',
		averageRating: 4.69,
		user: emptyUser,
		comments: []
	};

	beforeEach(() => {
		mockRouter = jasmine.createSpyObj(['navigate']);
		mockStore = jasmine.createSpyObj(['select', 'dispatch']);
		TestBed.configureTestingModule({
			imports: [SharedModule, MaterialModule],
			declarations: [MenuComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: Store, useValue: mockStore }
			]
		})
		fixture = TestBed.createComponent(MenuComponent);
		DISHES = [Dish1, Dish2, Dish3];
		mockStore.select.and.returnValue(of(DISHES));
	});

	it('should filter dishes correctly', () => {
		fixture.detectChanges();
		const inputElement = fixture.debugElement.query(By.css('input'));
		inputElement.nativeElement.value = "dish1";
		inputElement.triggerEventHandler('input', { target: { value: "dish1" } });
		fixture.detectChanges();
		fixture.componentInstance.filteredDishes$.subscribe(dishes => {
			expect(dishes.length).toBe(2);
			for (let dish of dishes) {
				expect(dish.name).toContain('dish1');
			}
		});
	});

	it('should render correct initial no of dishes in menu', () => {
		fixture.detectChanges();
		const rows = fixture.debugElement.queryAll(By.css('.mat-row'));
		expect(rows.length).toBe(3);
	});

	it('should call correct method when clicked on dish', () => {
		fixture.detectChanges();
		spyOn(fixture.componentInstance, 'onDishClicked');
		const rows = fixture.debugElement.queryAll(By.css('.mat-row'));
		rows[0].triggerEventHandler('click', null);
		expect(fixture.componentInstance.onDishClicked).toHaveBeenCalledWith(DISHES[0]);
	});

	it('should render correct data in table', () => {
		fixture.detectChanges();
		const rows = fixture.debugElement.queryAll(By.css(".mat-cell"));
		expect(rows.length).toBe(4 * DISHES.length);
		for (let i = 0; i < DISHES.length; ++i) {
			expect(rows[i * 4].nativeElement.textContent).toContain(DISHES[i].name);
			expect(rows[i * 4 + 1].nativeElement.textContent).toContain(DISHES[i].category);
			expect(rows[i * 4 + 2].nativeElement.textContent).toContain(DISHES[i].price);
			expect(rows[i * 4 + 3].nativeElement.textContent).toContain(DISHES[i].description);
		}
	});
})