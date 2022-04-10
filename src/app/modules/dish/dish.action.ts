import { createAction, props } from '@ngrx/store';
import { IDish, IDishWithUser, IDishWithUserAndComments } from './models/IDish';

export const listFilterAction = createAction(
	'[Menu] set listFilter',
	props<{ listFilter: string }>()
);

export const dishesAction = createAction(
	'[Menu] set dishes',
	props<{ dishes: IDishWithUserAndComments[] }>()
);

export const filteredDishesAction = createAction(
	'[Menu] set filteredDishes',
	props<{ filteredDishes: IDishWithUserAndComments[] }>()
);

// http actions
export const loadDishes = createAction('[Dishes] load');
export const loadDishesSuccess = createAction(
	'[Dishes] load success',
	props<{ dishes: IDishWithUserAndComments[] }>()
);
export const loadDishesError = createAction(
	'[Dishes] load error',
	props<{ error: string }>()
);

export const selectDish = createAction(
	'[Dish] select',
	props<{ dish: IDishWithUserAndComments }>()
);

// Update dish
export const updateDish = createAction(
	'[Dish] update',
	props<{ updatedDish: IDishWithUserAndComments; _id: string }>()
);
export const updateDishSuccess = createAction(
	'[Dish] update success',
	props<{ dish: IDishWithUserAndComments }>()
);
export const updateDishError = createAction(
	'[Dish] update error',
	props<{ error: string }>()
);

// add dish
export const addDish = createAction(
	'[Dish] add',
	props<{ newDish: Partial<IDishWithUser> }>()
);
export const addDishSuccess = createAction(
	'[Dish] add success',
	props<{ dish: IDishWithUserAndComments }>()
);
export const addDishError = createAction(
	'[Dish] add error',
	props<{ error: string }>()
);

// delete dish
export const deleteDish = createAction(
	'[Dish] delete',
	props<{ id: string }>()
);
export const deleteDishSuccess = createAction(
	'[Dish] delete success',
	props<{ dish: IDish }>()
);
export const deleteDishError = createAction(
	'[Dish] delete error',
	props<{ error: string }>()
);
