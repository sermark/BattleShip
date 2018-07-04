import * as React from 'react';
import { ICellProps } from '../types/index';

const Cell = ({ x, y, handleClick, className }: ICellProps): JSX.Element => (
	<li className={className} onClick={(event) => handleClick(event, x, y)} />
);

export default Cell;