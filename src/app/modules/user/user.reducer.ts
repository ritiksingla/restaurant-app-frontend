// angular redux
import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import * as AppState from '../../app.state';
// models
import { IUser } from './models/IUser';
import * as UserActions from './user.action';

export interface UserState {
	jwt_token: string;
	current_user: IUser;
	authenticated: boolean;
	error: string;
}

export interface State extends AppState.State {
	user: UserState;
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getAuthState = createSelector(
	getUserFeatureState,
	state => state.authenticated
);
export const getErrorState = createSelector(
	getUserFeatureState,
	state => state.error
);

const emptyUser: IUser = {
	_id: '',
	first_name: '',
	last_name: '',
	email: '',
	password: '',
};
const initialState: UserState = {
	jwt_token: '',
	authenticated: false,
	current_user: emptyUser,
	error: '',
};

export const userReducer = createReducer<UserState>(
	initialState,
	on(UserActions.loginUserSuccess, (state, action): UserState => {
		return {
			jwt_token: action.jwt,
			current_user: action.user,
			authenticated: true,
			error: '',
		};
	}),
	on(UserActions.loginUserError, (state, action): UserState => {
		return {
			current_user: emptyUser,
			jwt_token: '',
			authenticated: false,
			error: action.error,
		};
	}),
	on(UserActions.logoutUser, (state, action): UserState => {
		return {
			...state,
			current_user: emptyUser,
			jwt_token: '',
			authenticated: false,
		};
	}),
	on(UserActions.updateUserSuccess, (state, action): UserState => {
		return {
			...state,
			current_user: action.user,
			error: '',
		};
	}),
	on(UserActions.updateUserError, (state, action): UserState => {
		return {
			...state,
			error: action.error,
		};
	})
);
