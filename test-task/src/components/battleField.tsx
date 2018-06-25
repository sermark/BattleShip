import * as React from 'react';
import Cell from './cell';

interface Ifield {
	status: string;
}

export default class BattleField extends React.Component<Ifield, {}> {
	constructor(props: Ifield) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const cells: any[] = [];
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				cells.push(
					<Cell
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

