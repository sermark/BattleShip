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
	isItemInArray: (array: number[][], item: number[]) => boolean;
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

export interface IAction {
	payload: IbattleShip;
	type?: string
}

export interface IActionClickedField {
	payload: number[];
	type: string
}