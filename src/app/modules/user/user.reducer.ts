import { createReducer, on, createFeatureSelector, createSelector} from '@ngrx/store';
import { IUser } from './models/IUser';
import * as AppState from 'src/app/app.state';
import * as UserActions from './user.action';

export interface UserState {
	jwt_token: string;
	current_user: IUser;
	authenticated: boolean;
}

export interface State extends AppState.State {
	user: UserState;
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getAuthState = createSelector(
	getUserFeatureState,
	state => state.authenticated
);

const emptyUser: IUser = {
	first_name: '',
	last_name: '',
	email: '',
	password: ''
};
const initialState: UserState = {
	jwt_token: '',
	authenticated: false,
	current_user: emptyUser
};

export const userReducer = createReducer<UserState>(
	initialState,
	on(UserActions.loginUserSuccess, (state, action): UserState => {
		return {
			jwt_token: action.jwt,
			current_user: action.user,
			authenticated: true
		};
	}),
	on(UserActions.loginUserError, (state, action): UserState => {
		return {
			current_user: emptyUser,
			jwt_token: '',
			authenticated: false
		};
	}),
	on(UserActions.logoutUser, (state, action): UserState => {
		return {
			current_user: emptyUser,
			jwt_token: '',
			authenticated: false
		};
	})
);