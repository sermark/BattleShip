import { combineReducers } from 'redux';
import constants from '../utils/constants';

const battleShip = (state = [], action) => {
	let result = null;
	switch (action.type) {
		case constants.FETCH_SHIPS:
			return action.payload;
		default:
			return state;
	}
};

const battleShipSank = (state = [], action) => {
	let result = null;
	switch (action.type) {
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

const coordinatesSank = (state = [], action) => {
	switch (action.type) {
		case constants.FETCH_COORDINATES_SANK:
			return [...state, ...action.payload];
		default:
			return state;
	}
};

const coordinates = (state = [], action) => {
	switch (action.type) {
		case constants.FETCH_COORDINATES:
			return action.payload;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	battleShip,
	battleShipSank,
	coordinates,
	coordinatesSank
});

export default rootReducer;
