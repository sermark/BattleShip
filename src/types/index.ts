import { Action } from 'redux';

export interface IbattleShip {
	coord: number[][],
	isSank: boolean,
	name: string
}

export interface ICellProps {
	x: number;
	y: number;
	className: string;
	handleClick: (event: React.MouseEvent, x: number, y: number) => void;
}

export interface IBattleField {
	coordinates: number[][];
	coordinatesSank: number[][];
	actions: any;
	battleShip: IbattleShip[];
	clickedField: number[][];
	isVisible: boolean;
}

export interface IStoreState {
	battleShip: IbattleShip[];
	clickedField: number[][];

}

export interface IMainProps {
	battleShip: IbattleShip[];
	actions: any
}

export interface IMainState {
	isVisible: boolean;
}

export interface IMessageProps {
	text: string;
}

export interface IAction extends Action{
	payload: IbattleShip;
}

export interface IActionClickedField extends Action{
	payload: number[];
}
