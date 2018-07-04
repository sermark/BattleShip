import { IbattleShip } from '../../types/index';
import constants from '../utils/constants';

export const fetchShips = (payload: IbattleShip[]) => {
  return {
    payload,
    type: constants.FETCH_SHIPS,
  };
};

export const updateShips = (payload: IbattleShip) => {
  return {
    payload,
    type: constants.UPDATE_SHIPS,
  };
};

export const clickField = (payload: number[][]) => {
  return {
    payload,
    type: constants.CLICKED_FIELD,
  };
};