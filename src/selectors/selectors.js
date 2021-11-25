export const getNotes = (state) => state.notes;

export const getNoteByIndex = (index) => (state) => getNotes(state)[index];
