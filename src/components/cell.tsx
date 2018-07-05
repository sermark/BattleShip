import * as React from 'react';
import { ICellProps } from '../types/index';

const Cell: React.SFC<ICellProps> = ({ x, y, handleClick, className }): JSX.Element => (
	<li className={className} onClick={(event) => handleClick(event, x, y)} />
);

export default Cell;