import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from '@material-ui/core';

import { Column } from './Column';
import { ZEROED_COLUMNS } from './START_COLUMNS';

export const RandomColumns = () => {
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ButtonGroup style={{ marginTop: 10 }}>
                {isAddDisabled ?
                    <Button disabled style={{ backgroundColor: 'darkgray', color: 'white' }}>
                        {numberOfClicks} <FormattedMessage id="forFun.clicks" />
                    </Button> :
                    <Button id="columns-button-class" onClick={onAddClick}>
                        {numberOfClicks} <FormattedMessage id="forFun.clicks" />
                    </Button>
                }
                <Button id="columns-button-class" onClick={onResetClick}>
                    <FormattedMessage id="forFun.reset" />
                </Button>
                <Button id="columns-button-class" onClick={() => history.push("/")}>
                    <FormattedMessage id="forFun.goHome" />
                </Button>
            </ButtonGroup>
            <div style={{ height: 800, margin: 50, display: 'flex', alignItems: 'end' }}>
                {allColumns.map((value, key) =>
                    <Column key={key} color={value.color} height={value.height} />
                )}
            </div>
        </div>
    );
};
