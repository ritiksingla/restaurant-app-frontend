// angular redux
import { createFeatureSelector } from '@ngrx/store';

interface AppState {
	// theme: boolean;
}

export interface State {
	app: AppState;
}

const getAppFeatureState = createFeatureSelector<AppState>('app');

// export const getThemeState = createSelector(
// 	getAppFeatureState,
// 	state => state.theme
// );

// export const ThemeAction = createAction('[App] toggle theme');

// const initialState: AppState = {
// 	theme: false
// };

// export const appReducer = createReducer<AppState>(
// 	initialState,
// 	on(ThemeAction, (state): AppState => {
// 		return {
// 			theme: !state.theme
// 		};
// 	})
// );
