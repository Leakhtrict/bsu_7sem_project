import { RootState } from '../types';

export const getNotes = (state: RootState) => state.notes;

export const getNoteByIndex = (index: number) => (state: RootState) => getNotes(state)[index];
