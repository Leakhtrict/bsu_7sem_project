import { createSlice } from '@reduxjs/toolkit';

import {
    addNote,
    changeFavorite,
    deleteNote,
    editNote,
    getNotesFromLocalStorage
} from '../actions';
import { NotesItem } from '../types';

const defaultState: NotesItem[] = [];

const errorText = 'Something went wrong';

export const notesReducer = createSlice({
    name: '@notes',
    initialState: defaultState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNotesFromLocalStorage.fulfilled, (state, { payload }) => JSON.parse(payload));
        builder.addCase(getNotesFromLocalStorage.rejected, () => alert(errorText));
        builder.addCase(addNote.fulfilled, (state, { payload }) => {
            state.unshift(payload);
            state.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

            localStorage.setItem('bsu_project.notes', JSON.stringify(state));
            return state;
        });
        builder.addCase(addNote.rejected, () => alert(errorText));
        builder.addCase(editNote.fulfilled, (state, { payload: { index, note } }) => {
            state.splice(index, 1);
            state.unshift(note);
            state.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

            localStorage.setItem('bsu_project.notes', JSON.stringify(state));
            return state;
        });
        builder.addCase(editNote.rejected, () => alert(errorText));
        builder.addCase(changeFavorite.fulfilled, (state, { payload }) => {
            const currentNote = state[payload];

            if (currentNote.isFavorite) {
                state[payload].isFavorite = false;

                state.splice(payload, 1);
                state.unshift(currentNote);
                state.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
            } else {
                state[payload].isFavorite = true;

                state.splice(payload, 1);
                state.unshift(currentNote);
            }

            localStorage.setItem('bsu_project.notes', JSON.stringify(state));
            return state;
        });
        builder.addCase(changeFavorite.rejected, () => alert(errorText));
        builder.addCase(deleteNote.fulfilled, (state, { payload }) => {
            state.splice(payload, 1);

            localStorage.setItem('bsu_project.notes', JSON.stringify(state));
            return state;
        });
        builder.addCase(deleteNote.rejected, () => alert(errorText));
    },
});
