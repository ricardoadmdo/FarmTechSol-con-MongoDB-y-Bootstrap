import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image1 from '../../images/fondo/image1.jfif';
import Swal from 'sweetalert2';
import Axios from 'axios';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);

	const showErrorAlert = () => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Usuario o contraseña incorrectos',
		});
	};

	const showConfirm = nombre => {
		Swal.fire({
			title: 'Bienvenido a FarmTechSol <strong>' + nombre + '</strong>',
			text: 'Sesión iniciada correctamente',
			icon: 'success',
		});
	};

	const handleLogin = async (e, email, password) => {
		e.preventDefault();
		try {
			const response = await Axios.post('http://localhost:3001/api/users/loginUsuario', {
				email: email,
				password: password,
			});

			const data = response.data;
			if (data.ok) {
				const action = {
					type: types.login,
					payload: {
						nombre: data.nombre,
						rol: data.rol,
						email: data.email,
						uid: data.uid,
					},
				};
				dispatch(action);

				const lastPath = localStorage.getItem('lastPath') || '/compra';
				navigate(lastPath, {
					replace: true,
				});
				showConfirm(data.nombre);
			} else {
				showErrorAlert();
			}
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
			showErrorAlert();
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='containerr'>
			<div className='background' style={{ backgroundImage: `url(${image1})` }}></div>
			<div className='card animate__animated animate__fadeIn'>
				<div className='login'>
					<h3>Bienvenido Amigo!</h3>
					<h2>Inicia Sesión</h2>
					<form className='form' onSubmit={e => handleLogin(e, email, password)}>
						<div className='textbox'>
							<label className='label'>Su dirección de correo electrónico: </label>
							<input
								onChange={handleChange}
								value={email}
								type='email'
								name='email'
								placeholder='xxx@xxxx.com'
								required
							/>
							<span className='fa fa-lock'></span>
						</div>
						<div className='textbox'>
							<label className='label'>Contraseña: </label>
							<input
								onChange={handleChange}
								value={password}
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Contraseña'
								required
							/>
							<FontAwesomeIcon
								className='fa'
								icon={showPassword ? faEyeSlash : faEye}
								onClick={togglePasswordVisibility}
							/>
						</div>
						<button type='submit'>Iniciar Sesión</button>
						<Link to='/register' className='link'>
							{' '}
							¿No tienes una cuenta? Regístrate aquí
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};
