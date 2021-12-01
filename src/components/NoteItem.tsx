import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ButtonGroup, IconButton } from '@material-ui/core';
import { Star, Edit, Close, Delete, MoreVert, StarBorder } from '@material-ui/icons';

import { NoteItemType } from '../types';
import { changeFavorite, deleteNote } from '../actions';

interface INoteItem {
    index: number;
    note: NoteItemType;
}

export const NoteItem: FC<INoteItem> = ({ index, note }) => {
    let history = useHistory();

    const dispatch = useDispatch();

    const { uuid, title, body, isFavorite } = note;

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <div key={uuid} className="note">
            {isFavorite && <div className="favorite-star" />}
            {isMenuOpened &&
                <ButtonGroup style={{ height: 24, marginBottom: 8 }}>
                    <FormattedMessage id={isFavorite ? "noteItem.removeFromFavorite" : "noteItem.addToFavorite"}>
                        {(id) =>
                            <IconButton title={String(id[0])} onClick={() => {
                                setIsMenuOpened(false);
                                dispatch(changeFavorite(index));
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
                            <IconButton title={String(id[0])} onClick={() => {
                                dispatch(deleteNote(index));
                                setIsMenuOpened(!isMenuOpened);
                            }}>
                                <Delete />
                            </IconButton>
                        }
                    </FormattedMessage>
                </ButtonGroup>
            }
            <div style={{ display: "flex", alignItems: "center", borderTop: isMenuOpened ? '1px solid black' : 'none' }}>
                <b style={{ marginLeft: 12, padding: '4px 0' }}>{title}</b>
                <div style={{ marginLeft: "auto" }}>
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
