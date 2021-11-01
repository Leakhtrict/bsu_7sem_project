import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from '../reducers/notes';

export default configureStore({
    reducer: {
        notes: notesReducer.reducer,
    }
});
