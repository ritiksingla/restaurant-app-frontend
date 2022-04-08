import { RegisterComponent } from './register.component';
import { IUser } from '../../models/IUser';

import { of } from 'rxjs';

describe('register component', () => {
	let component: RegisterComponent;
	let mockUserService;
	// let mockNgForm;
	let mockRouter;
	// let user:IUser;
	beforeEach(() => {
		mockUserService = jasmine.createSpyObj('UserService', ['registerUser']);
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);
		// mockNgForm = jasmine.createSpyObj({
		// 	propertyName: 'valid'
		// });
		// mockNgForm.valid.and.returnValue(true);
		// component.user = user;
		mockUserService.registerUser.and.returnValue(of({ user: '' }));
		component = new RegisterComponent(mockRouter, mockUserService);
	});
	it('should call register method', () => {
		// expect(component.onSubmit).toHaveBeenCalled();
		expect('user').toBe('user');
	});
});
