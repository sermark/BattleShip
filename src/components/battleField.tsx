import * as React from 'react';
import { isItemInArray } from '../services/index';
import { IBattleField, IbattleShip } from '../types/index';
import Cell from './cell';

export default class BattleField extends React.Component<IBattleField, {}> {
	constructor(props: IBattleField) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const { coordinates, coordinatesSank, clickedField } = this.props;
		const cells: JSX.Element[] = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let classes: string = "cell";

				if (coordinates && isItemInArray(coordinates, [i, j])) {
					if (this.props.isVisible) {
						classes = classes + ' ship';
					} else {
						classes = classes;
					}
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
						handleClick={this.handleClick}
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

	private handleClick(event: React.MouseEvent<{}>, x: number, y: number): void {
		const { actions, battleShip } = this.props;
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
}
