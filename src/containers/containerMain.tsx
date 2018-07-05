import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Main from '../components/main';
import * as actions from '../redux/actions';
import { IStoreState, } from '../types/index';


const mapStateToProps = (state: IStoreState) => {
	const { battleShip } = state;
	return {
		battleShip
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);