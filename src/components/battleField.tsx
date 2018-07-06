import * as React from 'react';
import { isItemInArray } from '../services/index';
import { IBattleField, IbattleShip } from '../types/index';
import Cell from './cell';

export const BattleField: React.SFC<IBattleField> = (props): JSX.Element => {
	
	const { actions, battleShip, coordinates, coordinatesSank, clickedField, isVisible } = props;

	const handleClick = (event: React.MouseEvent<{}>, x: number, y: number): void => {
		const cellCoordanate: number[] = [x, y];
		actions.clickField(cellCoordanate);
		const checkArea = (arr: number[], elem: IbattleShip): void => {
			if (arr.every((v: number, i: number) => v === cellCoordanate[i])) {
				const elemSank: IbattleShip = {
					coord: elem.coord,
					isSank: true,
					name: elem.name,
				}
				actions.updateShips(elemSank);
			}
		}
		battleShip.map((elem: IbattleShip) => {
			elem.coord.map((e: number[]) => {
				checkArea(e, elem);
			})
		});
	}
	
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

	return (
		<ul className="battleField">
			{cells}
		</ul>
	)
}
