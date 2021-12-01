import { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editNote } from '../actions';
import { getNoteByIndex } from '../selectors';

import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export const EditNote = () => {
    let { index } = useParams();
    const currentNote = useSelector(getNoteByIndex(index))

    const { title: noteTitle, body: noteBody } = currentNote;

    let history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(noteTitle);
    const [titleError, setTitleError] = useState(false);

    const [body, setBody] = useState(noteBody);
    const [bodyError, setBodyError] = useState(false);

    const [selectedTab, setSelectedTab] = useState('write');

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
        if (title !== noteTitle || body !== noteBody)
            dispatch(editNote({ index, note: { ...currentNote, title, body } }));

        history.push('/');
    };

    return (
        <div className="edit-note-page">
            {titleError &&
                <p className="error-message">
                    <FormattedMessage id="addNewItem.titleError" />
                </p>
            }
            <FormattedMessage id="addNewItem.titleLabel">
                {(id) =>
                    <TextField
                        className="edit-note-page__title"
                        error={titleError}
                        value={title}
                        placeholder={id[0]}
                        onChange={onTitleChange}
                    />
                }
            </FormattedMessage>
            {bodyError &&
                <p className="error-message">
                    <FormattedMessage id="addNewItem.bodyError" />
                </p>
            }
            <div className="edit-note-page__body">
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
                    <Button id="disabled-button" disabled>
                        <FormattedMessage id="editItem.submitButton" />
                    </Button> :
                    <Button id="button-class" onClick={submitNote}>
                        <FormattedMessage id="editItem.submitButton" />
                    </Button>
                }
                <Button id="button-class" onClick={() => history.push('/')}>
                    <FormattedMessage id="addNewItem.cancelButton" />
                </Button>
            </div>
        </div>
    );
}
