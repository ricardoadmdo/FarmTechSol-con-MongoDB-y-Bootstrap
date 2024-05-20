import { useContext } from 'react';
import { AuthContext } from '../auth/authContext.jsx';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ children }) => {
	const { user } = useContext(AuthContext);

	return user.logged ? <Navigate to='/compra' /> : children;
};
PublicRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
