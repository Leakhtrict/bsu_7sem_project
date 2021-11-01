import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";
import AddNoteItem from "./AddNoteItem";

export default function NotesList() {
    const notes = useSelector((state) => state.notes);

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
