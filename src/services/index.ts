import { IbattleShip } from '../types/index';

export const generateShips = (): IbattleShip[] => {
	const unavailableCoords: number[][] = [];
	// create L-shaped ship.
	const coordsArray: number[][] = [];
	const lShipCoords: number[][] = generateLShipCoords();

	const lShip: IbattleShip = {
		coord: lShipCoords,
		isSank: false,
		name: 'Lship',
	}

	coordsArray.push(...lShip.coord);
	setUnavailableCells(unavailableCoords, coordsArray);

	// create I-shaped ship.
	let iShipCoords: number[][] = [];

	do {
		iShipCoords = generateIShipCoords();
	} while (!isCorrectCoords(coordsArray, iShipCoords));

	const iShip: IbattleShip = {
		coord: iShipCoords,
		isSank: false,
		name: 'Iship',
	}

	coordsArray.push(...iShip.coord);
	setUnavailableCells(unavailableCoords, iShipCoords);

	// create dot ships.
	let dotShip1Coords: number[] = [];

	do {
		dotShip1Coords = [getRandomCoord(), getRandomCoord()];
	} while (isItemInArray(unavailableCoords, dotShip1Coords));

	const dotOneShip: IbattleShip = {
		coord: [dotShip1Coords],
		isSank: false,
		name: 'dotShip1',
	}

	coordsArray.push(...dotOneShip.coord);
	setUnavailableCells(unavailableCoords, [dotShip1Coords]);

	let dotShip2Coords: number[] = [];

	do {
		dotShip2Coords = [getRandomCoord(), getRandomCoord()];
	} while (isItemInArray(unavailableCoords, dotShip2Coords));

	const dotTwoShip: IbattleShip = {
		coord: [dotShip2Coords],
		isSank: false,
		name: 'dotShip2',
	}

	coordsArray.push(...dotTwoShip.coord);

	const ships: IbattleShip[] = [];
	ships.push(lShip, iShip, dotOneShip, dotTwoShip);

	return ships;
}

const generateIShipCoords = (): number[][] => {
	const items: number[][] = [];
	const shipLength: number = 4;
	const fieldLength: number = 10;
	const x: number = getRandomCoord();
	const y: number = getRandomCoord();
	const orientation: string = getRandomShipOrientation();
	items.push([x, y]);

	if (orientation === 'vertical') {
		if (y + shipLength > fieldLength - 1) {
			items.push([x, y - 1]);
			items.push([x, y - 2]);
			items.push([x, y - 3]);
		} else {
			items.push([x, y + 1]);
			items.push([x, y + 2]);
			items.push([x, y + 3]);
		}
	} else {
		if (x + shipLength > fieldLength - 1) {
			items.push([x - 1, y]);
			items.push([x - 2, y]);
			items.push([x - 3, y]);
		} else {
			items.push([x + 1, y]);
			items.push([x + 2, y]);
			items.push([x + 3, y]);
		}
	}

	return items;
}

const generateLShipCoords = (): number[][] => {
	const items: number[][] = [];
	const shipLength: number = 3;
	const fieldLength: number = 10;
	const x: number = getRandomCoord();
	const y: number = getRandomCoord();
	const orientation: string = getRandomShipOrientation();
	items.push([x, y]);

	if (orientation === 'vertical') {
		if (y + shipLength > fieldLength - 1) {
			if (x - 1 < 0) {
				items.push([x + 1, y]);
				items.push([x + 1, y - 1]);
				items.push([x + 1, y - 2]);
			} else {
				items.push([x - 1, y]);
				items.push([x - 1, y - 1]);
				items.push([x - 1, y - 2]);
			}
		} else {
			if (x - 1 < 0) {
				items.push([x + 1, y]);
				items.push([x + 1, y + 1]);
				items.push([x + 1, y + 2]);
			} else {
				items.push([x - 1, y]);
				items.push([x - 1, y + 1]);
				items.push([x - 1, y + 2]);
			}
		}
	} else {
		if (x + shipLength > fieldLength - 1) {
			if (y - 1 < 0) {
				items.push([x, y + 1]);
				items.push([x - 1, y + 1]);
				items.push([x - 2, y + 1]);
			} else {
				items.push([x, y - 1]);
				items.push([x - 1, y - 1]);
				items.push([x - 2, y - 1]);
			}
		} else {
			if (y - 1 < 0) {
				items.push([x, y + 1]);
				items.push([x + 1, y + 1]);
				items.push([x + 2, y + 1]);
			} else {
				items.push([x, y - 1]);
				items.push([x + 1, y - 1]);
				items.push([x + 2, y - 1]);
			}
		}
	}
	return items;
}

const getRandomCoord = (): number => {
	return Math.floor(Math.random() * 10);
}

const getRandomShipOrientation = (): string => {
	const options = ['vertical', 'horizontal'];
	return options[Math.floor(Math.random() * options.length)];
}

const setUnavailableCells = (unavailableArray: number[][], array: number[][]): void => {
	for (const elem of array) {
		const item: number[] = elem;
		for (let x = item[0] - 1; x <= item[0] + 1; x++) {
			for (let y = item[1] - 1; y <= item[1] + 1; y++) {
				if (x >= 0 && y >= 0 && !isItemInArray(unavailableArray, [x, y])) {
					unavailableArray.push([x, y]);
				}
			}
		}
	}
}

export const isItemInArray = (array: number[][], item: number[]): boolean => {
	if (typeof array === 'undefined') {
		return false;
	}

	if (array.length === 0) {
		return false;
	}
	for (const elem of array) {
		if (elem[0] === item[0] && elem[1] === item[1]) {
			return true;
		}
	}
	return false;
}

const isCorrectCoords = (source: number[][], array: number[][]): boolean => {
	for (const elemArray of array) {
		for (const elemSource of source) {
			const wrongX = elemArray[0] >= (elemSource[0] - 1) && elemArray[0] <= (elemSource[0] + 1);
			const wrongY = elemArray[1] >= (elemSource[1] - 1) && elemArray[1] <= (elemSource[1] + 1);
			if (wrongX || wrongY) {
				return false;
			}
		}
	}
	return true;
}
