import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import BattleField from '../components/battleField';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import { IStoreState, } from '../types/index';

const mapStateToProps = (state: IStoreState) => {
	const { battleShip, clickedField } = state;
	return {
		battleShip,
		clickedField,
		coordinates: selectors.getCoordinates(battleShip),
		coordinatesSank: selectors.getCoordinatesSank(battleShip)
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BattleField);