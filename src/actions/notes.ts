import { createAsyncThunk } from '@reduxjs/toolkit';

import { NoteItemType } from '../types';

export const getNotesFromLocalStorage = createAsyncThunk(
    '@notes/getNotesFromLocalStorage',
    (_, { rejectWithValue }) => {
        try {
            return localStorage.getItem("bsu_project.notes") || '';
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addNote = createAsyncThunk(
    '@notes/addNote',
    (note: NoteItemType, { rejectWithValue }) => {
        try {
            if (note.title.length > 35 || note.title.length === 0 || (note.body && note.body.length > 400)) {
                return rejectWithValue({ error: "Max. title length - 35, body - 400" });
            }

            return note;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

interface IEditNote {
    index: number;
    note: NoteItemType;
}

export const editNote = createAsyncThunk(
    '@notes/editNote',
    ({ index, note }: IEditNote, { rejectWithValue }) => {
        if (note.title.length > 35 || note.title.length === 0 || (note.body && note.body.length > 400)) {
            return rejectWithValue({ error: "Max. title length - 35, body - 400" });
        }

        return { index, note };
    }
);

export const changeFavorite = createAsyncThunk(
    '@notes/changeFavorite',
    (position: number, { rejectWithValue }) => {
        try {
            return position;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteNote = createAsyncThunk(
    '@notes/deleteNote',
    (position: number, { rejectWithValue }) => {
        try {
            return position;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
