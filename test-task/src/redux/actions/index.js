import constants from '../utils/constants';

export const fetchCoordinates = (payload) => {
  return {
		payload,
		type: constants.FETCH_COORDINATES,
  };
};

export const fetchCoordinatesSank = (payload) => {
  return {
		payload,
		type: constants.FETCH_COORDINATES_SANK,
  };
};


export const fetchShips = (payload) => {
  return {
		payload,
		type: constants.FETCH_SHIPS,
  };
};

export const updateShips = (payload) => {
  return {
    payload,
    type: constants.UPDATE_SHIPS,
  };
};