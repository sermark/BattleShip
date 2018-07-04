import { IbattleShip } from '../../types/index'

export const getCoordinates = (payload: IbattleShip[]): number[][] => {
	const coordinates: number[][] = [];
	payload.forEach(elem => {
		coordinates.push(...elem.coord);
	});
	return coordinates
};

export const getCoordinatesSank = (payload: IbattleShip[]): number[][] => {
	const coordinates: number[][] = [];
	payload.forEach(elem => {
		if (elem.isSank) {
			coordinates.push(...elem.coord);
		}
	});
	return coordinates
};