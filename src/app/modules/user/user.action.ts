import { createAction, props } from '@ngrx/store';
import { IUser } from './models/IUser';

// Login User
export const loginUser = createAction('[User] login',
	props<{ email: string, password: string }>());
export const loginUserSuccess = createAction('[User] login success',
	props<{ user: IUser, jwt: string }>());
export const loginUserError = createAction('[User] login error',
	props<{ error: string }>());

// Logout user
export const logoutUser = createAction('[User] logout');