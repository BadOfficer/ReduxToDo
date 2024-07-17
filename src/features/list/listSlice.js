import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		add(state, action) {
			state.items = state.items.concat(action.payload);
		},

		done(state, action) {
			state.items = state.items.map((item) =>
				item.id === action.payload ? { ...item, status: 'done' } : item
			);
		},

		remove(state, action) {
			state.items = state.items.filter((item) => item.id === action.payload);
		},
	},
});

export const { add, done, remove } = listSlice.actions;

export default listSlice.reducer;
