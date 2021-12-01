import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';

import { getNotes } from '../selectors';
import { AddNoteItem, NoteItem } from '../components';

export const NotesList: FC = () => {
    let history = useHistory();

    const notes = useSelector(getNotes);

    return (
        <div className="notes-list">
            <Grid container alignItems="flex-start">
                <Grid item xl={1} lg={2} md={3} sm={4} xs={12}>
                    <Button id="button-class" onClick={() => history.push('/forFun')}>
                        <FormattedMessage id="notesList.forFunButton" />
                    </Button>
                    <AddNoteItem />
                </Grid>
                {notes && notes.map((note, key) =>
                    <Grid key={key} item xl={1} lg={2} md={3} sm={4} xs={12}>
                        <NoteItem index={key} note={note} />
                    </Grid>)
                }
            </Grid>
        </div>
    );
};
