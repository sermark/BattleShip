import * as React from 'react';
import Cell from './cell';

interface IBattleField {
	coordsArray: number[];
	isItemInArray(array: number[], item: number[]): boolean;
}

export default class BattleField extends React.Component<IBattleField, {}> {
	constructor(props: IBattleField) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const cells: JSX.Element[] = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let classes = "cell";
				if (this.props.coordsArray && this.props.isItemInArray(this.props.coordsArray, [i, j])) {
					classes = classes + ' ship';
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

	private handleClick(x: number, y: number): void {
		console.log(x, y);
	}
}

