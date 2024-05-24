import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { types } from '../../types/types';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const Perfil = () => {
	const { user, dispatch } = useContext(AuthContext);
	const [editMode, setEditMode] = useState(false);
	const [newName, setNewName] = useState(user.nombre);

	const handleSaveChanges = async (id, nombre) => {
		try {
			const response = await Axios.put('http://localhost:3001/api/users/change', {
				id,
				nombre,
			});

			const data = response.data.usuario;

			if (response.data.ok) {
				const action = {
					type: types.login,
					payload: {
						nombre: data.nombre,
						rol: data.rol,
						email: data.email,
						uid: data._id,
					},
				};
				dispatch(action); // Actualizar el usuario en el contexto
				Swal.fire({
					title: 'Cambio Satisfactorio',
					text: 'Nombre cambiado correctamente',
					icon: 'success',
				});
			} else {
				console.error('Error Por favor contacta al admin');
			}
		} catch (error) {
			console.error('Error al cambiar el nombre:', error);
		}
		setEditMode(false);
	};

	const handleCancel = () => {
		setEditMode(false);
	};

	return (
		<div className='card mx-auto my-4 animate__animated animate__fadeIn' style={{ maxWidth: '400px' }}>
			<div className='card-header text-center bg-light'>
				<FontAwesomeIcon icon={faUserCircle} size='3x' />
				<h2 className='h4'>{user.nombre}</h2>
			</div>
			<div className='card-body'>
				{editMode ? (
					<div>
						<input type='text' className='form-control mb-2' value={newName} onChange={(e) => setNewName(e.target.value)} />

						<div className='d-flex justify-content-between'>
							<button className='btn btn-primary' onClick={() => handleSaveChanges(user.uid, newName)}>
								Guardar cambios
							</button>
							<button className='btn btn-secondary' onClick={handleCancel}>
								Cancelar
							</button>
						</div>
					</div>
				) : (
					<div>
						<p className='card-text'>Nombre: {user.nombre}</p>
						<p className='card-text'>Rol: {user.rol}</p>
						<p className='card-text'>Correo: {user.email}</p>
						<button className='btn btn-info w-100 mt-3' onClick={() => setEditMode(true)}>
							Editar perfil
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
