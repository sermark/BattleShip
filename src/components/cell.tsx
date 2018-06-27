import * as React from 'react';

interface ICellProps {
    x: number;
    y: number;
    className: string;
    handleClick(x:number, y:number): void;
}

const Cell = ({ x, y, handleClick, className }: ICellProps) => (
    <li className={className} onClick={() => handleClick(x, y)} />
);

export default Cell;