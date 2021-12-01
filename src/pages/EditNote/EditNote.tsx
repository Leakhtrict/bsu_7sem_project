import React, { ChangeEvent, FC, useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { editNote } from '../../actions';
import { useAppDispatch } from '../../store';
import { MarkdownOptions } from '../../types';
import { getNoteByIndex } from '../../selectors';

import './EditNote.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export const EditNote: FC = () => {
    let { index } = useParams() as { index: string };
    const currentNote = useSelector(getNoteByIndex(Number(index)))

    const { title: noteTitle, body: noteBody } = currentNote;

    let history = useHistory();
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState(noteTitle);
    const [titleError, setTitleError] = useState(false);

    const [body, setBody] = useState(noteBody);
    const [bodyError, setBodyError] = useState(false);

    const [selectedTab, setSelectedTab] = useState<MarkdownOptions>('write');

    const isButtonDisabled = title.length === 0 || title.length > 35 || bodyError;

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;

        if (newTitle.length === 0 || newTitle.length > 35)
            setTitleError(true);
        else
            setTitleError(false);

        setTitle(newTitle);
    };

    const onBodyChange = (value: string) => {
        if (value.length > 400)
            setBodyError(true);
        else
            setBodyError(false);

        setBody(value);
    }

    const submitNote = async () => {
        if (title !== noteTitle || body !== noteBody)
            await dispatch(editNote({ index: Number(index), note: { ...currentNote, title, body } }));

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
                        placeholder={String(id[0])}
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
            <div className="edit-note-page__buttons">
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
