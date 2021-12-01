import React, { ChangeEvent, FC, useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import { addNote } from '../../actions';
import { useAppDispatch } from '../../store';
import { MarkdownOptions } from '../../types';

import './AddNewNote.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export const AddNewNote: FC = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const [body, setBody] = useState('');
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
        await dispatch(addNote({
            uuid: generateUniqueID(),
            title,
            body,
            isFavorite: false
        }));
        history.push('/');
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
                        className="add-new-note-page__title"
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
            <div className="add-new-note-page__body">
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
            <div className="add-new-note-page__buttons">
                {isButtonDisabled ?
                    <Button id="disabled-button" disabled>
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
