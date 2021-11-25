import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteItemType } from "../types/NoteItem";

export const addNote = createAsyncThunk(
    '@notes/addNote',
    (note: NoteItemType, { rejectWithValue }) => {
        if (note.title.length > 35 || note.title.length === 0 || (note.body && note.body.length > 400)) {
            return rejectWithValue({ error: "Max. title length - 35, body - 400" });
        }

        return note;
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
