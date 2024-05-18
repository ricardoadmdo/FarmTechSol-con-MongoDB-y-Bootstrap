import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const CRUDUsuario = () => {
	const [nombre, setNombre] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [rol, setRol] = useState('Usuario');
	const [id, setId] = useState('');
	const [operation, setOperation] = useState(1);
	const [usuariosList, setUsuarios] = useState([]);
	const [title, setTitle] = useState('');

	const limpiarCampos = () => {
		setNombre('');
		setPassword('');
		setEmail('');
		setRol('');
		setId('');
	};

	const add = () => {
		Axios.post('http://localhost:3001/api/users/create', {
			nombre: nombre,
			password: password,
			email: email,
			rol: rol,
		})
			.then(() => {
				getUsuarios();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>El usuario <strong>' + nombre + '</strong> fue registrado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.msg,
				});
			});
	};

	const update = () => {
		Axios.put('http://localhost:3001/api/users/update', {
			id: id,
			nombre: nombre,
			email: email,
			rol: rol,
		})
			.then(() => {
				getUsuarios();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitosa!!!</strong>',
					html: '<i>El usuario <strong>' + nombre + '</strong> fue actualizado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.msg,
				});
			});
	};

	const deleteUser = (val) => {
		Swal.fire({
			title: 'Confirmar eliminado?',
			html: '<i>Realmente desea eliminar a <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminarlo!',
		})
			.then((result) => {
				if (result.isConfirmed) {
					Axios.delete(`http://localhost:3001/api/users/delete/${val._id}`).then(() => {
						getUsuarios();
						limpiarCampos();
						Swal.fire({
							icon: 'success',
							title: val.nombre + ' fue eliminado.',
							showConfirmButton: false,
							timer: 2000,
						});
					});
				}
			})
			.catch(function (error) {
				console.log(error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.msg,
				});
			});
	};

	useEffect(() => {
		getUsuarios();
	}, []);

	const getUsuarios = () => {
		Axios.get('http://localhost:3001/api/users/usuarios')
			.then((response) => {
				setUsuarios(response.data.usuarios);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const validar = (event) => {
		event.preventDefault();
		if (nombre.trim() === '' || email.trim() === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operation === 1) {
				add();
			}

			if (operation === 2) {
				update();
			}

			document.getElementById('btnCerrar').click();
			getUsuarios();
		}
	};

	const openModal = (op, id, nombre, email, rol) => {
		setId('');
		setNombre('');
		setEmail('');
		setOperation(op);
		if (op === 1) {
			setTitle('Registrar Usuario');
		} else if (op === 2) {
			setId(id);
			setTitle('Editar Usuario');
			setNombre(nombre);
			setEmail(email);
			setRol(rol);
		}
		window.setTimeout(function () {
			document.getElementById('nombre').focus();
		}, 500);
	};

	//VISTAS
	return (
		<div className='container-fluid'>
			<div className='row mt-3'>
				<div className='col-md-4 offset-md-4'>
					<div className='d-grid mx-auto'>
						<button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
							<i className='fa-solid fa-circle-plus'></i> Añadir nuevo Usuario
						</button>
					</div>
				</div>
			</div>

			<div className='row mt-3 animate__animated animate__fadeIn'>
				<div className='card-body'>
					<div className='table-responsive'>
						<table className='table table-bordered'>
							<thead>
								<tr>
									<th>ID</th>
									<th>Nombre</th>
									<th>Correo Electrónico</th>
									<th>Rol</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{usuariosList.map((val) => (
									<tr key={val._id}>
										<td>{val._id}</td>
										<td>{val.nombre}</td>
										<td>{val.email}</td>
										<td>{val.rol}</td>
										<td>
											<button
												type='button'
												onClick={() => {
													openModal(2, val._id, val.nombre, val.email, val.rol);
												}}
												className='btn btn-warning'
												data-bs-toggle='modal'
												data-bs-target='#modalUsuarios'
											>
												<i className='fa fa-edit'></i>
												Editar
											</button>
											<span style={{ marginRight: '0px' }}></span>
											<button
												type='button'
												onClick={() => {
													deleteUser(val);
												}}
												className='btn btn-danger'
											>
												<i className='fa fa-trash'></i>
												Eliminar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div
				className='modal fade animate__animated animate__fadeIn'
				id='modalUsuarios'
				aria-hidden='true'
				aria-labelledby='exampleModalToggleLabel'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<label className='modal-title h5'>{title}</label>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
								{' '}
							</button>
						</div>
						<div className='modal-body'>
							<input type='hidden' id='id'></input>

							<form id='Form' onSubmit={validar}>
								<div className='input-group mb-3'>
									<span className='input-group-text'>Nombre:</span>
									<input
										type='text'
										id='nombre'
										className='form-control'
										placeholder='Ingrese un nombre'
										value={nombre}
										onChange={(event) => setNombre(event.target.value)}
									></input>
								</div>
								<div className='input-group mb-3'>
									<span className='input-group-text'>Correo Electrónico:</span>
									<input
										type='email'
										id='email'
										className='form-control'
										placeholder='Ingrese un correo electrónico'
										value={email}
										onChange={(event) => setEmail(event.target.value)}
									></input>
								</div>

								{operation === 1 && (
									<div className='input-group mb-3'>
										<span className='input-group-text'>Contraseña:</span>
										<input
											type='password'
											id='password'
											className='form-control'
											placeholder='Ingrese una contraseña'
											value={password}
											onChange={(event) => setPassword(event.target.value)}
										></input>
									</div>
								)}
								<div className='input-group mb-3'>
									<span className='input-group-text'>Rol:</span>
									<select
										defaultValue='Usuario'
										className='form-select'
										aria-label='Default select example'
										onChange={(event) => setRol(event.target.value)}
									>
										<option>Usuario</option>
										<option>Administrador</option>
									</select>
								</div>
							</form>
							<div className='d-grid col-6 mx-auto'>
								<button type='submit' form='Form' className='btn btn-success'>
									<i className='fa fa-floppy-disk'></i> Guardar
								</button>
							</div>

							<div className='modal-footer'>
								<button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
									<i className='fa fa-times'></i> Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
