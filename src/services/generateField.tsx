import * as React from 'react';
import { IbattleShip } from '../types/index';
import { isItemInArray } from './index';

export const generateFieldWithShips = (
	coordinates: number[][],
	isVisible: boolean,
	clickedField: number[][],
	coordinatesSank: number[][],
	Cell: React.SFC<any>,
	handleClick: (event: React.MouseEvent<{}>, x: number, y: number) => void
): JSX.Element[] => {
	const cells: JSX.Element[] = [];
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			let classes: string = "cell";

			if (coordinates && isItemInArray(coordinates, [i, j]) && isVisible) {
				classes = classes + ' ship';
			}

			if (clickedField && isItemInArray(clickedField, [i, j]) && coordinatesSank && !isItemInArray(coordinatesSank, [i, j])) {
				classes = classes + ' missed';
			}

			if (coordinatesSank && isItemInArray(coordinatesSank, [i, j])) {
				classes = classes + ' defeated';
			}

			cells.push(
				<Cell
					className={classes}
					handleClick={handleClick}
					key={i * 10 + j}
					x={i}
					y={j}
				/>
			)
		}
	}
	return cells;
}

export const checkArea = (arr: number[], arrClicked: number[], elem: IbattleShip): IbattleShip | boolean => {
	if (arr.every((v: number, i: number) => v === arrClicked[i])) {
		const elemSank: IbattleShip = {
			coord: elem.coord,
			isSank: true,
			name: elem.name,
		}
		return elemSank;
	} else {
		return false;
	}
}