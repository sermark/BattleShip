import { combineReducers, Reducer } from 'redux';
import { IAction, IActionClickedField, IbattleShip } from '../../types/index';
import { actionTypes } from '../utils/constants';

const battleShip: Reducer<{}> = (state: IbattleShip[] = [], action: IAction) => {
	let result: IbattleShip[];
	switch (action.type) {
		case actionTypes.FETCH_SHIPS:
			return action.payload;
		case actionTypes.UPDATE_SHIPS:
			if (state.find(item => item.name === action.payload.name)) {
				result = state.map((item) => {
					return item.name === action.payload.name ? action.payload : item;
				});
			} else {
				result = [...state, action.payload];
			}
			return result;
		default:
			return state;
	}
};

const clickedField: Reducer<number[][]> = (state: number[][] = [], action: IActionClickedField) => {
	let result: number[][] = [];
	switch (action.type) {
		case actionTypes.CLICKED_FIELD:
			return result = [...state, action.payload];
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	battleShip,
	clickedField
});

export default rootReducer;