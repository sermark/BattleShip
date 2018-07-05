import * as React from 'react';
import BattleField from '../containers/containerBattleField';
import { generateShips } from '../services/index';
import { IMainProps, IMainState } from '../types/index';
import Message from './message';

export default class Main extends React.Component<IMainProps, IMainState> {
	constructor(props: IMainProps) {
		super(props);

		this.handleToogleVisability = this.handleToogleVisability.bind(this);

		this.state = {
			isVisible: false
		}
	}

	public componentDidMount(): void {
		this.props.actions.fetchShips(generateShips());
	}

	public handleToogleVisability(): void {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}

	public render() {
		const { isVisible } = this.state;
		const { battleShip } = this.props;
		const isSankAll: boolean = battleShip.every(({ isSank }) => isSank)
		return (
			<div>
				<BattleField isVisible={isVisible} />
				{isSankAll ? <Message text={'Game Over'} /> : null}
				<button className={'button'} onClick={this.handleToogleVisability}>Toggle Visibility</button>
			</div>
		)
	}
}
