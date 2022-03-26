// angular redux
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../app.state';
import * as DishAction from './dish.action';

// models
import { IUser } from '../user/models/IUser';
import { IDish } from './models/IDish';

export interface DishState {
  listFilter: string;
  dishes: IDish[];
  filteredDishes: IDish[];
  selectedDish: IDish;
  error: string;
}
export interface State extends AppState.State {
  dish: DishState;
}

const emptyUser: IUser = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const emptyDish: IDish = {
  name: '',
  imageUrl: '',
  category: '',
  label: '',
  price: 0,
  description: '',
  averageRating: 0,
  user: emptyUser,
  comments: [],
};

const initialDishState: DishState = {
  listFilter: '',
  dishes: [],
  filteredDishes: [],
  selectedDish: emptyDish,
  error: '',
};

const getDishFeatureState = createFeatureSelector<DishState>('dish');

export const getListFilterState = createSelector(
  getDishFeatureState,
  (state) => state.listFilter
);

export const getDishesState = createSelector(
  getDishFeatureState,
  (state) => state.dishes
);

export const getFilteredDishesState = createSelector(
  getDishFeatureState,
  (state) => state.filteredDishes
);

export const getErrorState = createSelector(
  getDishFeatureState,
  (state) => state.error
);

export const getSelectedDishState = createSelector(
  getDishFeatureState,
  (state) => state.selectedDish
);

export const getSelectedDishIdState = createSelector(
  getSelectedDishState,
  (state) => state._id
);

export const dishReducer = createReducer<DishState>(
  initialDishState,
  on(DishAction.loadDishesSuccess, (state, action): DishState => {
    return {
      ...state,
      dishes: action.dishes,
      filteredDishes: action.dishes, // initially all are filtered
    };
  }),
  on(DishAction.loadDishesError, (state, action): DishState => {
    return {
      ...state,
      dishes: [],
      error: action.error,
    };
  }),
  on(DishAction.listFilterAction, (state, action): DishState => {
    return {
      ...state,
      listFilter: action.listFilter,
    };
  }),
  on(DishAction.filteredDishesAction, (state, action): DishState => {
    return {
      ...state,
      filteredDishes: action.filteredDishes,
    };
  }),
  on(DishAction.dishesAction, (state, action): DishState => {
    return {
      ...state,
      dishes: action.dishes,
    };
  }),
  on(DishAction.updateDishError, (state, action): DishState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(DishAction.updateDishSuccess, (state, action): DishState => {
    const updatedDishes: IDish[] = state.dishes.map((dish) => {
      if (dish._id === action.dish._id) return action.dish;
      else return dish;
    });
    return {
      ...state,
      dishes: updatedDishes,
      filteredDishes: updatedDishes,
    };
  }),
  on(DishAction.addDishError, (state, action): DishState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(DishAction.addDishSuccess, (state, action): DishState => {
    return {
      ...state,
      dishes: [...state.dishes, action.dish],
      filteredDishes: [...state.filteredDishes, action.dish],
    };
  }),
  on(DishAction.deleteDishError, (state, action): DishState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(DishAction.deleteDishSuccess, (state, action): DishState => {
    const updatedDishes = state.dishes.filter(
      (dish) => dish._id !== action.dish._id
    );
    return {
      ...state,
      dishes: updatedDishes,
      filteredDishes: updatedDishes,
    };
  }),
  on(DishAction.selectDish, (state, action): DishState => {
    return {
      ...state,
      selectedDish: action.dish,
    };
  })
);
