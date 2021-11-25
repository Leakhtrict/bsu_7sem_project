import { configureStore } from '@reduxjs/toolkit';

import { notesReducer } from '../reducers';

const store = configureStore({
    reducer: {
        notes: notesReducer.reducer,
    }
});

export default store;
