import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from '@material-ui/core';

import { Column } from './Column';
import { ZEROED_COLUMNS } from './START_COLUMNS';

export const RandomColumns: FC = () => {
    let history = useHistory();

    const [allColumns, setAllColumns] = useState(ZEROED_COLUMNS);
    const [numberOfClicks, setNumberOfClicks] = useState(0);
    const [isAddDisabled, setIsAddDisabled] = useState(false);

    const onAddClick = () => {
        const randomRatio = Math.min(8, Math.floor(101 - allColumns[0].height));
        setAllColumns(prevState => [...prevState].map((value => {
            const newHeight = value.height + Math.random() * randomRatio;

            if (newHeight >= 100)
                setIsAddDisabled(true);

            return { color: value.color, height: newHeight };
        })));
        setAllColumns(prevState => [...prevState].sort((a, b) => b.height - a.height));
        setNumberOfClicks(prevState => prevState + 1);
    }

    const onResetClick = () => {
        setIsAddDisabled(false);
        setNumberOfClicks(0);
        setAllColumns(ZEROED_COLUMNS);
    };

    return (
        <div className="random-columns">
            <ButtonGroup className="random-columns__options">
                {isAddDisabled ?
                    <Button id="disabled-button" disabled>
                        {numberOfClicks} <FormattedMessage id="forFun.clicks" />
                    </Button> :
                    <Button id="columns-button-class" onClick={onAddClick}>
                        {numberOfClicks} <FormattedMessage id="forFun.clicks" />
                    </Button>
                }
                <Button id="columns-button-class" onClick={onResetClick}>
                    <FormattedMessage id="forFun.reset" />
                </Button>
                <Button id="columns-button-class" onClick={() => history.push('/')}>
                    <FormattedMessage id="forFun.goHome" />
                </Button>
            </ButtonGroup>
            <div className="all-columns">
                {allColumns.map((value, key) =>
                    <Column key={key} color={value.color} height={value.height} />
                )}
            </div>
        </div>
    );
};
