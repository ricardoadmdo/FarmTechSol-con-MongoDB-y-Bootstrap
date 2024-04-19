import { types } from '../types/types.jsx';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				nombre: action.payload.nombre,
				rol: action.payload.rol,
				email: action.payload.email,
				uid: action.payload.uid,
				logged: true,
			};

		case types.logout:
			return {
				logged: false,
			};

		default:
			return state;
	}
};
