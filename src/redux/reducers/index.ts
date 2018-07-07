import { Action, combineReducers, Reducer } from 'redux';
import { IAction, IActionClickedField, IbattleShip } from '../../types/index';
import { actionTypes } from '../utils/constants';

const battleShip: Reducer<{}> = (state: IbattleShip[] = [], action: IAction) => {
	switch (action.type) {
		case actionTypes.FETCH_SHIPS:
			return action.payload;
		case actionTypes.UPDATE_SHIPS:
			if (state.find(item => item.name === action.payload.name)) {
				return state.map((item) => {
					return item.name === action.payload.name ? action.payload : item;
				});
			} else {
				return [...state, action.payload];
			}
		default:
			return state;
	}
};

const clickedField: Reducer<number[][]> = (state: number[][] = [], action: IActionClickedField) => {
	switch (action.type) {
		case actionTypes.CLICKED_FIELD:
			return [...state, action.payload];
		default:
			return state;
	}
};

const isVisible: Reducer<boolean> = (state: boolean = false, action: Action<{}>) => {
	switch (action.type) {
		case actionTypes.SHOW_SHIPS:
			return !state;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	battleShip,
	clickedField,
	isVisible
});

export default rootReducer;
