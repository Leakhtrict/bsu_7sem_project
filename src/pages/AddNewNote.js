import { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import { addNote } from '../actions';

import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export const AddNewNote = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const [body, setBody] = useState('');
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
        dispatch(addNote({
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
            <div>
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
