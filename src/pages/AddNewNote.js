import { useState } from "react";
import ReactMde from "react-mde";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { FormattedMessage } from "react-intl";
import * as Showdown from "showdown";

import { addNote } from '../actions/notes';

import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function AddNewNote() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [body, setBody] = useState("");
    const [selectedTab, setSelectedTab] = useState("write");

    const isButtonDisabled = title.length === 0 || title.length > 35 || bodyError;

    const onTitleChange = (event) => {
        const newTitle = event.target.value;
        if (newTitle.length === 0 || newTitle.length > 35)
            setTitleError(true);
        else
            setTitleError(false);
        setTitle(event.target.value)
    };

    const onBodyChange = (value) => {
        if (value.length > 400)
            setBodyError(true);
        else
            setBodyError(false);
        setBody(value);
    }

    const submitNote = () => {
        dispatch(addNote({
            id: generateUniqueID(),
            title,
            body,
            isFavorite: false
        }));
        history.push("/");
    };

    return (
        <div className="add-new-note-page">
            {titleError &&
                <p className="error-message">
                    <FormattedMessage id="addNewItem.titleError" />
                </p>
            }
            <FormattedMessage id="addNewItem.titleLabel">
                {(id) =>
                    <TextField
                        error={titleError}
                        value={title}
                        placeholder={id}
                        onChange={onTitleChange}
                        style={{width: "70vw", maxWidth: 700}}
                    />
                }
            </FormattedMessage>
            {bodyError &&
                <p className="error-message">
                    <FormattedMessage id="addNewItem.bodyError" />
                </p>
            }
            <div style={{ width: "90vw", maxWidth: 800, marginBottom: 12 }}>
                <ReactMde
                    value={body}
                    onChange={onBodyChange}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    childProps={{
                        writeButton: {
                            tabIndex: -1
                        }
                    }}
                />
            </div>
            <div>
                {isButtonDisabled ?
                    <Button onClick={submitNote} disabled style={{ margin: 4, backgroundColor: 'darkgray', color: 'white' }}>
                        <FormattedMessage id="addNewItem.submitButton" />
                    </Button> :
                    <Button id="button-class" onClick={submitNote}>
                        <FormattedMessage id="addNewItem.submitButton" />
                    </Button>
                }
                <Button id="button-class" onClick={() => history.push('/')}>
                    <FormattedMessage id="addNewItem.cancelButton" />
                </Button>
            </div>
        </div>
    );
}
