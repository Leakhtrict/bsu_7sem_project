import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { getNotes } from '../selectors';
import { AddNoteItem, NoteItem } from '../components';

export const NotesList = () => {
    const notes = useSelector(getNotes);

    return (
        <div className="notes-list">
            <Grid container alignItems="flex-start">
                <Grid item xl={1} lg={2} md={3} sm={4} xs={12}>
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
