import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext.jsx';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { types } from '../../types/types.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faShoppingCart,
	faBoxOpen,
	faChalkboard,
	faInfoCircle,
	faSignOutAlt,
	faGraduationCap,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo/logo.png';

export const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: types.logout });

		navigate('/', {
			replace: true,
		});
	};

	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark bg-dark'
			style={{ paddingRight: '5px' }}
		>
			<NavLink className='navbar-brand' to='/compra'>
				<img src={logo} alt='logo de la página FarmTechSol' style={{ height: '50px' }} />
			</NavLink>

			<div className='navbar-collapse'>
				<div className='navbar-nav'>
					<NavLink
						className='nav-item nav-link'
						to='/compra'
						style={{ whiteSpace: 'nowrap' }}
					>
						<FontAwesomeIcon icon={faShoppingCart} /> Productos
					</NavLink>

					<NavLink
						className='nav-item nav-link'
						to='/cursos'
						style={{ whiteSpace: 'nowrap' }}
					>
						<FontAwesomeIcon icon={faGraduationCap} /> Cursos
					</NavLink>

					{user.rol === 'Administrador' && (
						<NavLink
							className='nav-item nav-link '
							to='/usuarios'
							style={{ whiteSpace: 'nowrap' }}
						>
							<FontAwesomeIcon icon={faUser} /> Gestionar Usuarios
						</NavLink>
					)}

					{user.rol === 'Administrador' && (
						<NavLink
							className='nav-item nav-link'
							to='/producto'
							style={{ whiteSpace: 'nowrap' }}
						>
							<FontAwesomeIcon icon={faBoxOpen} /> Gestionar Productos
						</NavLink>
					)}

					{user.rol === 'Administrador' && (
						<NavLink
							className='nav-item nav-link'
							to='/AdminCurso'
							style={{ whiteSpace: 'nowrap' }}
						>
							<FontAwesomeIcon icon={faChalkboard} /> Gestionar Cursos
						</NavLink>
					)}

					<NavLink
						className='nav-item nav-link'
						to='/about'
						style={{ whiteSpace: 'nowrap' }}
					>
						<FontAwesomeIcon icon={faInfoCircle} /> Acerca de
					</NavLink>
				</div>
			</div>

			<div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end'>
				<div className='navbar-nav ml-auto'>
					<span className='nav-item nav-link text-info'>Bienvenido</span>

					<NavLink className='btn btn-outline-light' to='/perfil'>
						<FontAwesomeIcon icon={faUserCircle} />
						{user.nombre}
					</NavLink>
					<span style={{ marginRight: '5px' }}></span>
					<NavLink className='btn btn-outline-light' to='/carrito'>
						🛒Carrito de compra
					</NavLink>
					<span style={{ marginRight: '5px' }}></span>
					<button className='btn btn-outline-light' onClick={handleLogout}>
						Cerrar Sesión <FontAwesomeIcon icon={faSignOutAlt} />
					</button>
				</div>
			</div>
		</nav>
	);
};
