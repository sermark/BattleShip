import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import Cell from './cell';

interface IBattleField {
	coordinates: number[][];
	actions: any;
	battleShip: any;
	battleShipSank: any;
	isItemInArray(array: number[][], item: number[]): boolean;
}

class BattleField extends React.Component<IBattleField, {}> {
	constructor(props: IBattleField) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const newCoord = [];
		newCoord.push(
			this.props.battleShipSank.map((elem: any) => elem.coord)
		);
		const res:any = [];
		newCoord.map((elem:any) => res.push(elem));
		// console.log(res);
		const cells: JSX.Element[] = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let classes = "cell";
				if (this.props.coordinates && this.props.isItemInArray(this.props.coordinates, [i, j])) {
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
		const cellCoordanate = [x, y];
		const { battleShip } = this.props;
		const checkArea = (arr: number[], elem: any) => {
			if (arr.every((v: number, i: number) => v === cellCoordanate[i])) {
				const elemSank = {
					coord: elem.coord,
					isSank: !elem.isSank,
					name: elem.name,
				}
				this.props.actions.updateShips(elemSank);
				this.props.actions.fetchCoordinatesSank(elem.coord);
			}
		}
		battleShip.map((elem: any) => {
				elem.coord.map((e: any) => {
					checkArea(e, elem);
				})
		});
	}
}

const mapStateToProps = (state: any) => {
	const { coordinates, battleShip, battleShipSank } = state;
	return {
		battleShip,
		battleShipSank,
		coordinates,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BattleField);
