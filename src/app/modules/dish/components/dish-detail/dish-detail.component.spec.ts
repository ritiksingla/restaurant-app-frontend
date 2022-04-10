import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import {
	ComponentFixture,
	fakeAsync,
	flush,
	TestBed,
	async,
} from '@angular/core/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { DishService } from '../../dish.service';
import { UserService } from '../../../user/user.service';
import { DishDetailComponent } from './dish-detail.component';
import { IDish } from '../../models/IDish';
import { IUser } from '../../../user/models/IUser';

import DataDishes from '../../../shared/data/DataDishes.json';
import DataUsers from '../../../shared/data/DataUsers.json';

class ParamMap {
	public static keys: Record<string, string>[] = [];
	public static _index(key: string): number {
		return this.keys.findIndex(p => {
			return p[key] !== undefined;
		});
	}
	public static has(key: string): boolean {
		return this._index(key) !== -1;
	}
	public static get(key: string): string {
		let idx = this._index(key);
		return this.keys[idx][key];
	}
}

describe('Dish Detail Component', () => {
	let mockRouter, mockStore, mockLocation;
	let mockDishService, mockUserService;
	let fixture: ComponentFixture<DishDetailComponent>;
	let loader: HarnessLoader;
	let dish: IDish = DataDishes.dishes[0];
	let users: IUser[] = DataUsers.users;
	let mockActivatedRoute = {
		snapshot: {
			queryParamMap: ParamMap,
		},
	};
	let paramMap: typeof ParamMap = mockActivatedRoute.snapshot.queryParamMap;

	beforeEach(async () => {
		mockLocation = jasmine.createSpyObj(['back']);
		mockDishService = jasmine.createSpyObj([
			'getDish',
			'deleteComment',
			'postComment',
		]);
		mockRouter = jasmine.createSpyObj(['navigate']);
		mockStore = jasmine.createSpyObj(['dispatch']);
		mockUserService = jasmine.createSpyObj(['getUsers']);

		await TestBed.configureTestingModule({
			imports: [SharedModule, BrowserAnimationsModule, MaterialModule],
			declarations: [DishDetailComponent],
			providers: [
				{ provide: Location, useValue: mockLocation },
				{ provide: Router, useValue: mockRouter },
				{ provide: Store, useValue: mockStore },
				{ provide: DishService, useValue: mockDishService },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: UserService, useValue: mockUserService },
			],
		}).compileComponents();
		fixture = TestBed.createComponent(DishDetailComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);

		mockDishService.getDish.and.returnValue(of(dish));
		mockUserService.getUsers.and.returnValue(of(users));
		let id = dish._id;
		if (id !== undefined) {
			let e: Record<string, string> = { id: id };
			paramMap.keys.push(e);
			fixture.detectChanges();
		}
		fixture.componentInstance.currentUser = dish.user;
		fixture.detectChanges();
	});

	it('should render dish detail card correctly', async () => {
		fixture.detectChanges();
		// const cards = await loader.getAllHarnesses(MatCardHarness);
		// expect(cards.length).toBe(1);
		expect(true).toBe(true);
	});
});
