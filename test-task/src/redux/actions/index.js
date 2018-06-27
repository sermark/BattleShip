import constants from '../utils/constants';

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

export const clickField = (payload) => {
  return {
    payload,
    type: constants.CLICKED_FIELD,
  };
};