import { createAsyncThunk } from '@reduxjs/toolkit';

import { NotesItem } from 'types';

export const getNotesFromLocalStorage = createAsyncThunk(
    '@notes/getNotesFromLocalStorage',
    (_, { rejectWithValue }) => {
        try {
            return localStorage.getItem('notexx_alpha.notes') || '[]';
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addNote = createAsyncThunk(
    '@notes/addNote',
    (note: NotesItem, { rejectWithValue }) => {
        try {
            const { title, body } = note;

            if (title.length > 35 || title.length === 0 || (body && body.length > 400)) {
                return rejectWithValue({ error: 'Max. title length - 35, body - 400' });
            }

            return note;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

interface IEditNote {
    index: number;
    note: NotesItem;
}

export const editNote = createAsyncThunk(
    '@notes/editNote',
    ({ index, note }: IEditNote, { rejectWithValue }) => {
        try {
            const { title, body } = note;

            if (title.length > 35 || title.length === 0 || (body && body.length > 400)) {
                return rejectWithValue({ error: 'Max. title length - 35, body - 400' });
            }

            return { index, note };
        } catch (error) {
            return rejectWithValue(error);
        }
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
