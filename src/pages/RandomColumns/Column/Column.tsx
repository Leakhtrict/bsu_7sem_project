import React, { FC } from 'react';

import './Column.css';

interface IColumn {
    color: string;
    height: number;
}

export const Column: FC<IColumn> = ({ color, height }) => (
    <div
        className="column"
        style={{
        backgroundColor: color,
        height: `${height}%`,
        border: `2px solid ${color}`
        }}
    >
        {Math.floor(height)}
    </div>
);
