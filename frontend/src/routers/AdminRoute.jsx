import { useContext } from 'react';
import { AuthContext } from '../auth/authContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AdminRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	return user.logged && user.rol === 'Administrador' ? children : <Navigate to='/' state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
