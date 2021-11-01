import { useHistory } from 'react-router-dom';

export default function AddNoteItem() {
    let history = useHistory();

    return (
        <div className="add-note-item" onClick={() => history.push("/addNewNote")}>
            <div className="add-note-item-plus-icon" />
        </div>
    );
}
