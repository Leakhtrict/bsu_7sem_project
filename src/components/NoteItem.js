import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ButtonGroup, IconButton } from '@material-ui/core';

import { changeFavorite, deleteNote } from '../actions';

export const NoteItem = ({ index, note }) => {
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
                            <IconButton title={id} onClick={() => dispatch(changeFavorite(index))}>
                                {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="noteItem.editItem">
                        {(id) =>
                            <IconButton title={id} onClick={() => history.push(`/editNote/${index}`)}>
                                <EditIcon />
                            </IconButton>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="noteItem.deleteItem">
                        {(id) =>
                            <IconButton title={id} onClick={() => {
                                dispatch(deleteNote(index));
                                setIsMenuOpened(!isMenuOpened);
                            }}>
                                <DeleteIcon />
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
                            <IconButton size="small" title={id} onClick={() => setIsMenuOpened(!isMenuOpened)} >
                                {isMenuOpened ? <CloseIcon /> : <MoreVertIcon />}
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
