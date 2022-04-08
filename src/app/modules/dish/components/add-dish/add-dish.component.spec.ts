import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import {
	ComponentFixture,
	fakeAsync,
	flush,
	TestBed,
} from '@angular/core/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { DishService } from '../../dish.service';
import { AddDishComponent } from './add-dish.component';

class ParamMap {
	public static keys: Record<string, string>[] = [];
	public static _index(key: string): number {
		return this.keys.findIndex(p => p.key === key);
	}
	public static has(key: string): boolean {
		return this._index(key) !== -1;
	}
	public static get(key: string): string {
		let idx = this._index(key);
		return this.keys[idx].value;
	}
}

describe('Add Dish Component', () => {
	let mockRouter, mockStore;
	let mockDishService = {
		categories$: of(['']),
		labels$: of(['']),
	};
	let fixture: ComponentFixture<AddDishComponent>;
	let loader: HarnessLoader;

	let mockActivatedRoute = {
		snapshot: {
			queryParamMap: ParamMap,
		},
	};
	let paramMap: typeof ParamMap = mockActivatedRoute.snapshot.queryParamMap;
	const emptyUser = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	};
	let Dish = {
		_id: '1',
		name: 'dish1',
		imageUrl: 'https://www.images.com/dish1.png',
		category: 'pizza',
		label: 'spicy',
		price: 3.99,
		description: 'dish1 pizza spicy',
		averageRating: 3.69,
		user: emptyUser,
		comments: [],
	};
	const dishCategories = [
		'pizza',
		'burger',
		'sweets',
		'seafood',
		'chineese',
		'italian',
		'café',
		'cake',
		'pasta',
		'bakery',
		'bar',
		'sushi',
	];

	const dishLabels = [
		'sweet',
		'spicy',
		'hot',
		'cold',
		'low sugar',
		'low fat',
		'high calories',
		'veg',
		'non-veg',
		'best seller',
	];

	beforeEach(async () => {
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);
		mockStore = jasmine.createSpyObj('Store', ['dispatch']);
		mockDishService.categories$ = of(dishCategories);
		mockDishService.labels$ = of(dishLabels);

		await TestBed.configureTestingModule({
			imports: [SharedModule, BrowserAnimationsModule, MaterialModule],
			declarations: [AddDishComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: Store, useValue: mockStore },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: DishService, useValue: mockDishService },
			],
		}).compileComponents();
		fixture = TestBed.createComponent(AddDishComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
	});

	it('should render two select forms for categories and labels', async () => {
		fixture.detectChanges();
		const selectElements = await loader.getAllHarnesses(MatSelectHarness);
		expect(selectElements.length).toBe(2);
	});

	it('should render categories correctly', async () => {
		fixture.detectChanges();
		const selectElements = await loader.getAllHarnesses(MatSelectHarness);
		const categoryElement = selectElements[0];
		await categoryElement.open();
		const categoryElementOptions = await categoryElement.getOptions();
		expect(categoryElementOptions.length).toBe(dishCategories.length);
		for (let i = 0; i < dishCategories.length; ++i) {
			let content = await categoryElementOptions[i].getText();
			expect(content).toEqual(dishCategories[i]);
		}
	});

	it('should render labels correctly', async () => {
		fixture.detectChanges();
		const selectElements = await loader.getAllHarnesses(MatSelectHarness);
		const categoryElement = selectElements[1];
		await categoryElement.open();
		const categoryElementOptions = await categoryElement.getOptions();
		expect(categoryElementOptions.length).toBe(dishLabels.length);
		for (let i = 0; i < dishLabels.length; ++i) {
			let content = await categoryElementOptions[i].getText();
			expect(content).toEqual(dishLabels[i]);
		}
	});

	it('should render dish form for updating', fakeAsync(() => {
		for (let [key, value] of Object.entries(Dish)) {
			value = String(value);
			let e: Record<string, string> = { key, value };
			paramMap.keys.push(e);
		}
		fixture.detectChanges();
		expect(fixture.componentInstance.btnTitle).toEqual('Update');

		flush();

		let inputElements: DebugElement[] = fixture.debugElement.queryAll(
			By.css('input')
		);
		for (const inputElement of inputElements) {
			let expectedValue = paramMap.get(inputElement.nativeElement.name);
			expect(inputElement.nativeElement.value).toEqual(expectedValue);
		}

		inputElements = fixture.debugElement.queryAll(By.css('textarea'));
		for (const inputElement of inputElements) {
			let expectedValue = paramMap.get(inputElement.nativeElement.name);
			expect(inputElement.nativeElement.value).toEqual(expectedValue);
		}
	}));
});
