import * as React from 'react';
import { checkArea, generateFieldWithShips } from '../services/index';
import { IBattleField, IbattleShip } from '../types/index';
import Cell from './cell';

export const BattleField: React.SFC<IBattleField> = (props): JSX.Element => {

	const { actions, battleShip, coordinates, coordinatesSank, clickedField, isVisible } = props;

	const handleClick = (event: React.MouseEvent<{}>, x: number, y: number): void => {
		const cellCoordanate: number[] = [x, y];
		actions.clickField(cellCoordanate);

		battleShip.map((elem: IbattleShip) => {
			elem.coord.map((e: number[]) => {
				if(checkArea(e, cellCoordanate, elem)) {
					actions.updateShips(checkArea(e, cellCoordanate, elem));
				}
			})
		});
	}

	return (
		<ul className="battleField">
			{generateFieldWithShips(coordinates, isVisible, clickedField, coordinatesSank, Cell, handleClick)}
		</ul>
	)
}
