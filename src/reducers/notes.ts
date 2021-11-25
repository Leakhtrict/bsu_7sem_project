import { createSlice } from '@reduxjs/toolkit';

import { NoteItemType } from '../types';
import {
    addNote,
    changeFavorite,
    deleteNote,
    editNote,
    getNotesFromLocalStorage
} from '../actions';

const defaultState: NoteItemType[] = [];

export const notesReducer = createSlice({
    name: '@notes',
    initialState: defaultState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNotesFromLocalStorage.fulfilled, (state, { payload }) => JSON.parse(payload));
        builder.addCase(addNote.fulfilled, (state, { payload }) => {
            state.unshift(payload);

            localStorage.setItem("bsu_project.notes", JSON.stringify(state));
            return state;
        });
        builder.addCase(addNote.rejected, (state, payload) => alert(payload.error));
        builder.addCase(editNote.fulfilled, (state, { payload: { index, note } }) => {
            state.splice(index, 1);
            state.unshift(note);

            localStorage.setItem("bsu_project.notes", JSON.stringify(state));
            return state;
        });
        builder.addCase(editNote.rejected, (state, payload) => alert(payload.error));
        builder.addCase(changeFavorite.fulfilled, (state, { payload }) => {
            const updFavField = !state[payload].isFavorite;
            state[payload].isFavorite = updFavField;

            localStorage.setItem("bsu_project.notes", JSON.stringify(state));
            return state;
        });
        builder.addCase(changeFavorite.rejected, (state, payload) => alert(payload.error));
        builder.addCase(deleteNote.fulfilled, (state, { payload }) => {
            state.splice(payload, 1);

            localStorage.setItem("bsu_project.notes", JSON.stringify(state));
            return state;
        });
        builder.addCase(deleteNote.rejected, (state, payload) => alert(payload.error));
    },
});
