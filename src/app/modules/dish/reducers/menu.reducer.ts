import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../../app.state';
import { IDish } from '../model/IDish';
import * as MenuAction from '../actions/menu.action';

export interface MenuState {
	listFilter: string;
	dishes: IDish[];
	filteredDishes: IDish[];
	selectedDish: IDish;
	error: string;
}
export interface State extends AppState.State {
	menu: MenuState;
}

const initialMenuState: MenuState = {
	listFilter: '',
	dishes: [],
	filteredDishes: [],
	selectedDish: {
		name: '',
		imageUrl: '',
		category: '',
		label: '',
		price: 0,
		description: '',
		starRating: 0,
		user:{
			first_name:'',
			last_name:'',
			email:'',
			password:''
		},
		comments: []
	},
	error: '',
};

const getMenuFeatureState = createFeatureSelector<MenuState>('menu');

export const getListFilterState = createSelector(
	getMenuFeatureState,
	state => state.listFilter
);

export const getDishesState = createSelector(
	getMenuFeatureState,
	state => state.dishes
);

export const getFilteredDishesState = createSelector(
	getMenuFeatureState,
	state => state.filteredDishes
);

export const getErrorState = createSelector(
	getMenuFeatureState,
	state => state.error
);

export const getSelectedDishState = createSelector(
	getMenuFeatureState,
	state => state.selectedDish
);

export const getSelectedDishIdState = createSelector(
	getSelectedDishState,
	state => state._id
);

export const menuReducer = createReducer<MenuState>(
	initialMenuState,
	on(MenuAction.listFilterAction, (state, action): MenuState => {
		return {
			...state,
			listFilter: action.listFilter
		};
	}),
	on(MenuAction.filteredDishesAction, (state, action): MenuState => {
		return {
			...state,
			filteredDishes: action.filteredDishes
		};
	}),
	on(MenuAction.dishesAction, (state, action): MenuState => {
		return {
			...state,
			dishes: action.dishes
		};
	}),
	on(MenuAction.loadDishesSuccess, (state, action): MenuState => {
		return {
			...state,
			dishes: action.dishes,
			filteredDishes: action.dishes // initially all are filtered
		};
	}),
	on(MenuAction.loadDishesError, (state, action): MenuState => {
		alert(JSON.stringify(action.error));
		return {
			...state,
			dishes: [],
			error: action.error
		};
	}),
	on(MenuAction.updateDishError, (state, action): MenuState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(MenuAction.updateDishSuccess, (state, action): MenuState => {
		const updatedDishes: IDish[] = state.dishes.map(dish => {
			if (dish._id === action.dish._id)
				return action.dish;
			else return dish;
		});
		return {
			...state,
			dishes: updatedDishes,
			filteredDishes: updatedDishes
		};
	}),
	on(MenuAction.addDishError, (state, action): MenuState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(MenuAction.addDishSuccess, (state, action): MenuState => {
		return {
			...state,
			dishes: [...state.dishes, action.dish],
			filteredDishes: [...state.filteredDishes, action.dish]
		};
	}),
	on(MenuAction.deleteDishError, (state, action): MenuState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(MenuAction.deleteDishSuccess, (state, action): MenuState => {
		const updatedDishes = state.dishes.filter(dish => dish._id !== action.dish._id);
		return {
			...state,
			dishes: updatedDishes,
			filteredDishes: updatedDishes
		};
	}),
	on(MenuAction.selectDish, (state, action): MenuState => {
		return {
			...state,
			selectedDish: action.dish
		};
	})
);