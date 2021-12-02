import { useDispatch } from 'react-redux';
import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import { notesReducer } from 'reducers';

export const store = configureStore({
    reducer: {
        notes: notesReducer.reducer,
    }
});

type RootState = ReturnType<typeof store.getState>;

type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
