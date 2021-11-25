import { ButtonGroup, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { changeFavorite, deleteNote } from '../actions/notes';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function NoteItem({ index, note }) {
    const { id, title, body, isFavorite } = note;
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const dispatch = useDispatch();

    return (
        <div key={id} className="note">
            {isMenuOpened &&
                <ButtonGroup>
                    <FormattedMessage id={isFavorite ? "noteItem.removeFromFavorite" : "noteItem.addToFavorite"}>
                        {(id) =>
                            <IconButton title={id} onClick={() => dispatch(changeFavorite(index))}>
                                {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="noteItem.editItem">
                        {(id) =>
                            <IconButton title={id}>
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
            <div style={{ display: "flex", alignItems: "center" }}>
                <b style={{ marginLeft: 12 }}>{title}</b>
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
