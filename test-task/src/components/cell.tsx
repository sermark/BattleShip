import * as React from 'react';

interface ICellProps {
    x: number;
    y: number;
    handleClick(x:number, y:number): void;
}

const Cell = ({ x, y, handleClick }: ICellProps) => (
    <li className="cell" onClick={() => handleClick(x, y)} />
);

export default Cell;