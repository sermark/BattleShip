import * as React from 'react';
import { IBattleField, IbattleShip } from '../types/index';
import Cell from './cell';


export default class BattleField extends React.Component<IBattleField, {}> {
	constructor(props: IBattleField) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const cells: JSX.Element[] = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let classes: string = "cell";

				if (this.props.coordinates && this.props.isItemInArray(this.props.coordinates, [i, j])) {
					if (this.props.isVisible) {
						classes = classes + ' ship';
					} else {
						classes = classes;
					}

				}

				if (this.props.clickedField && this.props.isItemInArray(this.props.clickedField, [i, j])
					&& this.props.coordinatesSank && !this.props.isItemInArray(this.props.coordinatesSank, [i, j])) {
					classes = classes + ' missed';
				}

				if (this.props.coordinatesSank && this.props.isItemInArray(this.props.coordinatesSank, [i, j])) {
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
		const cellCoordanate: number[] = [x, y];
		this.props.actions.clickField(cellCoordanate);
		const { battleShip } = this.props;
		const checkArea = (arr: number[], elem: IbattleShip) => {
			if (arr.every((v: number, i: number) => v === cellCoordanate[i])) {
				const elemSank: IbattleShip = {
					coord: elem.coord,
					isSank: true,
					name: elem.name,
				}
				this.props.actions.updateShips(elemSank);
			}
		}
		battleShip.map((elem: IbattleShip) => {
			elem.coord.map((e: number[]) => {
				checkArea(e, elem);
			})
		});
	}
}
