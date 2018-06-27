import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import Cell from './cell';

interface IBattleField {
	coordinates: number[][];
	coordinatesSank: number[][];
	actions: any;
	battleShip: any;
	clickedField: number[][];
	isVisible:boolean;
	isItemInArray(array: number[][], item: number[]): boolean;
}

class BattleField extends React.Component<IBattleField, {}> {
	constructor(props: IBattleField) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render() {
		const cells: JSX.Element[] = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let classes = "cell";

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

	private handleClick(x: number, y: number): void {
		const cellCoordanate = [x, y];
		this.props.actions.clickField(cellCoordanate);
		const { battleShip } = this.props;
		const checkArea = (arr: number[], elem: any) => {
			if (arr.every((v: number, i: number) => v === cellCoordanate[i])) {
				const elemSank = {
					coord: elem.coord,
					isSank: true,
					name: elem.name,
				}
				this.props.actions.updateShips(elemSank);
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
	const { battleShip, clickedField } = state;
	return {
		battleShip,
		clickedField,
		coordinates: selectors.getCoordinates(battleShip),
		coordinatesSank: selectors.getCoordinatesSank(battleShip)
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BattleField);