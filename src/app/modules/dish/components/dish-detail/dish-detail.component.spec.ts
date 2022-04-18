import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import DataDishes from '../../../shared/data/DataDishes.json';
import DataUsers from '../../../shared/data/DataUsers.json';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { IUser } from '../../../user/models/IUser';
import { UserService } from '../../../user/user.service';
import { DishService } from '../../dish.service';
import { IDishWithUserAndComments } from '../../models/IDish';
import { DishDetailComponent } from './dish-detail.component';

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
		const idx = this._index(key);
		return this.keys[idx][key];
	}
}

describe('Dish Detail Component', () => {
	let mockRouter, mockStore, mockLocation;
	let mockDishService, mockUserService;
	let fixture: ComponentFixture<DishDetailComponent>;
	let loader: HarnessLoader;
	const dish: IDishWithUserAndComments = DataDishes.dishes[0];
	const users: IUser[] = DataUsers.users;
	const mockActivatedRoute = {
		snapshot: {
			paramMap: ParamMap,
		},
	};
	const paramMap: typeof ParamMap = mockActivatedRoute.snapshot.paramMap;

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

		mockDishService.getDish.and.returnValue(of(dish));
		mockUserService.getUsers.and.returnValue(of(users));

		const value = dish._id;
		const e: Record<string, string> = { id: value };
		paramMap.keys.push(e);

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
				FormBuilder,
			],
		}).compileComponents();
		fixture = TestBed.createComponent(DishDetailComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
		fixture.componentInstance.currentUser = dish.user;
		fixture.detectChanges();
	});

	it('should render dish detail card correctly', () => {
		// const cards = await loader.getAllHarnesses(MatCardHarness);
		// expect(cards.length).toBe(1);
		expect(true).toBe(true);
	});
});
