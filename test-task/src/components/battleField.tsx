import * as React from 'react';
import Cell from './cell';

// interface Ifield {
// 	coordsArray: number[];
// 	getRandomCoord():number;
// 	isItemInArray(array:any, item:any):boolean;
// }

export default class BattleField extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const cells: any[] = [];
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

