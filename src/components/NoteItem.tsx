import React, { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ButtonGroup, IconButton } from '@material-ui/core';
import { Star, Edit, Close, Delete, MoreVert, StarBorder } from '@material-ui/icons';

import { NotesItem } from '../types';
import { useAppDispatch } from '../store';
import { changeFavorite, deleteNote } from '../actions';

interface INoteItem {
    index: number;
    note: NotesItem;
}

export const NoteItem: FC<INoteItem> = ({ index, note }) => {
    let history = useHistory();

    const dispatch = useAppDispatch();

    const { uuid, title, body, isFavorite } = note;

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <div key={uuid} className="note">
            {isFavorite && <div className="favorite-star" />}
            {isMenuOpened &&
                <ButtonGroup className="note__options">
                    <FormattedMessage id={isFavorite ? "noteItem.removeFromFavorite" : "noteItem.addToFavorite"}>
                        {(id) =>
                            <IconButton title={String(id[0])} onClick={async () => {
                                await dispatch(changeFavorite(index));
                                setIsMenuOpened(false);
                            }}>
                                {isFavorite ? <Star /> : <StarBorder />}
                            </IconButton>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="noteItem.editItem">
                        {(id) =>
                            <IconButton title={String(id[0])} onClick={() => history.push(`/editNote/${index}`)}>
                                <Edit />
                            </IconButton>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="noteItem.deleteItem">
                        {(id) =>
                            <IconButton title={String(id[0])} onClick={async () => {
                                await dispatch(deleteNote(index));
                                setIsMenuOpened(!isMenuOpened);
                            }}>
                                <Delete />
                            </IconButton>
                        }
                    </FormattedMessage>
                </ButtonGroup>
            }
            <div className="note__title">
                <b className="note__title__text">{title}</b>
                <div className="note__title__button">
                    <FormattedMessage id="noteItem.moreOptions">
                        {(id) =>
                            <IconButton
                                size="small"
                                title={String(id[0])}
                                onClick={() => setIsMenuOpened(!isMenuOpened)}
                            >
                                {isMenuOpened ? <Close /> : <MoreVert />}
                            </IconButton>
                        }
                    </FormattedMessage>
                </div>
            </div>

            {body &&
                <div className="note__body">
                    <ReactMarkdown>{body}</ReactMarkdown>
                </div>
            }
        </div>
    );
};
