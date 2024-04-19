import { createContext, useEffect, useReducer, useState } from 'react';
import { authReducer } from './authReducer';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const init = () => {
	return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

export const AuthProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		// Recuperar el carrito de localStorage al inicializar el estado
		const localCart = localStorage.getItem('cart');
		return localCart ? JSON.parse(localCart) : [];
	});

	const [user, dispatch] = useReducer(authReducer, {}, init);
	const removeFromCart = productId => {
		setCart(cart.filter(item => item._id !== productId));
	};
	const clearCart = () => {
		setCart([]);
		Swal.fire({
			title: '<strong>Carrito vaciado</strong>',
			html: '<i>Ha eliminado todos los productos del carrito de compra.</i><br>',
			icon: 'success',
			timer: 2000,
		});
	};

	useEffect(() => {
		if (!user) return;

		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		// Guardar el carrito en localStorage cada vez que cambie
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (producto, cantidadAdd) => {
		Swal.fire({
			title: 'Producto agregado al carrito',
			icon: 'success',
			showConfirmButton: false,
			timer: 500,
		});
		// Buscar si el producto ya está en el carrito
		const existeProducto = cart.findIndex(item => item._id === producto._id);

		// Si el producto ya está en el carrito, actualiza la cantidadAdd
		if (existeProducto !== -1) {
			const updatedCart = [...cart];
			updatedCart[existeProducto].cantidadAdd += Number(cantidadAdd);
			setCart(updatedCart);
		} else {
			// Si el producto no está en el carrito, añádelo con la cantidadAdd especificada
			setCart([...cart, { ...producto, cantidadAdd: Number(cantidadAdd) }]);
		}
	};

	const login = credentials => {
		dispatch({
			type: 'login',
			payload: credentials,
		});
	};

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart, user, dispatch, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
