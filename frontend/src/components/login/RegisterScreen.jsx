import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image1 from '../../images/fondo/image1.jfif';
import Swal from 'sweetalert2';
import Axios from 'axios';

export const RegisterScreen = () => {
	const [nombre, setNombre] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const showConfirm = () => {
		Swal.fire({
			title: 'Usuario Registrado con éxito',
			text: 'Por favor Inicie Sesión',
			icon: 'success',
		});
	};
	const handleRegister = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			Axios.post('http://localhost:3001/api/users/createUserRegister', {
				nombre: nombre,
				password: password,
				email: email,
				rol: 'Usuario',
			})
				.then(() => {
					setNombre('');
					setPassword('');
					setEmail('');
					showConfirm();
					navigate('/');
				})
				.catch((error) => {
					if (error.response && error.response.data && error.response.data.msg) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: error.response.data.msg,
						});
					} else {
						Swal.fire({
							icon: 'warning',
							title: 'Contraseña no valida',
							text: 'La contraseña debe tener al menos 8 caracteres.',
						});
					}
				});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Las contraseñas no coinciden',
			});
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const togglePasswordVisibility1 = () => {
		setShowPassword1(!showPassword1);
	};

	return (
		<div className='container d-flex justify-content-center align-items-center vh-100 '>
			<div
				className='position-absolute top-0 start-0 w-100 h-100'
				style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', zIndex: '-1' }}
			></div>
			<div
				className='card p-4 shadow text-center animate__animated animate__fadeIn'
				style={{ borderRadius: '24px', backgroundColor: 'rgba(250, 250, 250, 0.819)', zIndex: '2' }}
			>
				<h3 className='mb-3'>Necesitas una cuenta para continuar!</h3>
				<h2 className='mb-4'>Registrarse</h2>
				<form className='d-grid gap-3' onSubmit={(e) => handleRegister(e)}>
					<div className='form-group'>
						<label>Su nombre:</label>
						<input
							className='form-control'
							onChange={(event) => setNombre(event.target.value)}
							value={nombre}
							type='text'
							name='name'
							placeholder='Nombre Completo'
							required
						/>
					</div>
					<div className='form-group'>
						<label>Correo electrónico:</label>
						<input
							className='form-control'
							onChange={(event) => setEmail(event.target.value)}
							value={email}
							type='email'
							name='address'
							placeholder='Correo electrónico'
							required
						/>
					</div>
					<div className='form-group position-relative'>
						<label>Contraseña:</label>
						<input
							className='form-control'
							onChange={(event) => setPassword(event.target.value)}
							value={password}
							type={showPassword ? 'text' : 'password'}
							name='password'
							placeholder='Al menos 6 caracteres'
							required
						/>
						<FontAwesomeIcon
							className='position-absolute top-50 end-0 translate-middle-y me-3'
							icon={showPassword ? faEyeSlash : faEye}
							onClick={togglePasswordVisibility}
						/>
					</div>
					<div className='form-group position-relative'>
						<input
							className='form-control'
							onChange={(event) => setConfirmPassword(event.target.value)}
							value={confirmPassword}
							type={showPassword1 ? 'text' : 'password'}
							name='confirmPassword'
							placeholder='Introduzca su contraseña otra vez'
							required
						/>
						<FontAwesomeIcon
							className='position-absolute top-50 end-0 translate-middle-y me-3'
							icon={showPassword1 ? faEyeSlash : faEye}
							onClick={togglePasswordVisibility1}
						/>
					</div>
					<button className='btn btn-success' type='submit'>
						Registrarse
					</button>
					<Link to='/' className='text-primary'>
						¿Ya tienes una cuenta? Inicia Sesión aquí
					</Link>
				</form>
			</div>
		</div>
	);
};
