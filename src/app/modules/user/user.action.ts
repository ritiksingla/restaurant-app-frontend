// angular redux
import { createAction, props } from '@ngrx/store';
// models
import { IUser } from './models/IUser';

// Login User
export const loginUser = createAction(
	'[User] login',
	props<{ email: string; password: string }>()
);
export const loginUserSuccess = createAction(
	'[User] login success',
	props<{ user: IUser; jwt: string }>()
);
export const loginUserError = createAction(
	'[User] login error',
	props<{ error: string }>()
);

// Logout user
export const logoutUser = createAction('[User] logout');

// Update user
export const updateUser = createAction(
	'[User] update',
	props<{ userId: string; user: Partial<IUser> }>()
);
export const updateUserSuccess = createAction(
	'[User] update success',
	props<{ user: IUser }>()
);
export const updateUserError = createAction(
	'[User] update error',
	props<{ error: string }>()
);
