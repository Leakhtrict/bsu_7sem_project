import { createSlice } from '@reduxjs/toolkit';
import { addNote, changeFavorite, deleteNote } from '../actions/notes';
import { NoteItemType } from '../types/NoteItem';

const defaultState: NoteItemType[] = [];

export const notesReducer = createSlice({
    name: '@notes',
    initialState: defaultState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addNote.fulfilled, (state, { payload }) => {
            const newNote = {
                id: Math.floor(Math.random() * 1000000),
                title: payload.title,
                isFavorite: false,
                body: payload.body,
                backgroundColor: payload.backgroundColor,
                fontColor: payload.fontColor,
            };

            return [...state, newNote];
        });
        builder.addCase(addNote.rejected, (state, payload) => alert(payload.error.message));
        builder.addCase(changeFavorite.fulfilled, (state, { payload }) => {
            const updFavField = !state[payload].isFavorite;
            state[payload].isFavorite = updFavField;

            return state;
        });
        builder.addCase(changeFavorite.rejected, (state, payload) => alert(payload.error.message));
        builder.addCase(deleteNote.fulfilled, (state, { payload }) => {
            state.splice(payload, 1);

            return state;
        });
        builder.addCase(deleteNote.rejected, (state, payload) => alert(payload.error.message));
    },
});
