import * as React from 'react';
import BattleField from '../containers/containerBattleField';
import { generateShips } from '../services/index';
import { IMainProps } from '../types/index';
import Message from './message';

export default class Main extends React.Component<IMainProps, {}> {
	constructor(props: IMainProps) {
		super(props);
	}

	public componentDidMount(): void {
		this.props.actions.fetchShips(generateShips());
	}

	public render() {
		const { battleShip, actions } = this.props;
		const isSankAll: boolean = battleShip.every(({ isSank }) => isSank)
		return (
			<>
				<BattleField />
				{isSankAll ? <Message text={'Game Over'} /> : null}
				<button className={'button'} onClick={actions.showShips}>Toggle Visibility</button>
			</>
		)
	}
}
