import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from '../reducers/notes';

const store = configureStore({
    reducer: {
        notes: notesReducer.reducer,
    }
});

export default store;
