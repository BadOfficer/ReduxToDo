const initialState = {
	items: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'list/add':
			return {
				...state,
				items: state.items.concat({
					id: action.payload.id,
					title: action.payload.title,
					description: action.payload.description,
					date: action.payload.date,
					status: action.payload.status,
				}),
			};
		case 'list/done':
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload ? { ...item, status: 'done' } : item
				),
			};
		case 'list/remove':
			return {
				...state,
				items: state.items.filter((item) => item.id == action.payload),
			};
		default:
			return state;
	}
}

export function add(item) {
	return { type: 'list/add', payload: item };
}
export function done(id) {
	return { type: 'list/done', payload: id };
}
export function remove(id) {
	return { type: 'list/remove', payload: id };
}
