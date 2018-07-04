import { IAction, IActionClickedField } from '../../types/index';
import { actionTypes } from '../utils/constants';


export const fetchShips = (payload: IAction[]) => {
  return {
    payload,
    type: actionTypes.FETCH_SHIPS,
  };
};

export const updateShips = (payload: IAction) => {
  return {
    payload,
    type: actionTypes.UPDATE_SHIPS,
  };
};

export const clickField = (payload: IActionClickedField[]) => {
  return {
    payload,
    type: actionTypes.CLICKED_FIELD,
  };
};