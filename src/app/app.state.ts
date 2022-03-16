import { createAction, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

interface AppState {
	theme:boolean;
}

export interface State {
	app: AppState;
}

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getThemeState = createSelector(
	getAppFeatureState,
	state => state.theme
);

export const ThemeAction = createAction('[App] toggle theme');

export const appReducer = createReducer<AppState>(
	{theme: false},
	on(ThemeAction, (state): AppState => {
		return {
			theme: !state.theme
		};
	})
);