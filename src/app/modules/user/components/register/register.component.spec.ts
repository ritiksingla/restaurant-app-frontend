import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../user.service';
import { RegisterComponent } from './register.component';

describe('register component', () => {
	let fixture: ComponentFixture<RegisterComponent>;
	let loader: HarnessLoader;
	let mockUserService;
	let mockRouter;
	beforeEach(async () => {
		mockUserService = jasmine.createSpyObj('UserService', ['registerUser']);
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);

		await TestBed.configureTestingModule({
			imports: [
				SharedModule,
				BrowserAnimationsModule,
				MaterialModule,
				ReactiveFormsModule,
			],
			declarations: [RegisterComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: UserService, useValue: mockUserService },
				FormBuilder,
			],
		}).compileComponents();
		fixture = TestBed.createComponent(RegisterComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
	});
	it('should mount register component', () => {
		expect(true).toBe(true);
	});
});
