import { combineReducers } from 'redux';
import { IAction, IActionClickedField, IbattleShip } from '../../types/index';
import constants from '../utils/constants';

const battleShip = (state: IbattleShip[] = [], action: IAction):(IbattleShip[] | IbattleShip) => {
	let result: IbattleShip[];
	switch (action.type) {
		case constants.FETCH_SHIPS:
			return action.payload;
		case constants.UPDATE_SHIPS:
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

const clickedField = (state:number[][] = [], action:IActionClickedField):number[][] => {
	let result:number[][] = [];
	switch (action.type) {
		case constants.CLICKED_FIELD:
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