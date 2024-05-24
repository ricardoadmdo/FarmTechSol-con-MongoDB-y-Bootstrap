import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const CRUDCurso = () => {
	const [id, setId] = useState('');
	const [nombre, setNombre] = useState('');
	const [description, setDescription] = useState('');
	const [precio, setPrecio] = useState('');

	const [operation, setOperation] = useState(1);
	const [cursosList, setCursos] = useState([]);
	const [title, setTitle] = useState('');

	const limpiarCampos = () => {
		setNombre('');
		setDescription('');
		setPrecio('');
		setId('');
	};

	const addCurso = () => {
		Axios.post('http://localhost:3001/api/curso/create', {
			nombre: nombre,
			description: description,
			precio: precio,
		})
			.then(() => {
				getCursos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>El curso <strong>' + nombre + '</strong> fue registrado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text:
						JSON.parse(JSON.stringify(error)).message === 'Network Error'
							? 'Intente mas tarde'
							: JSON.parse(JSON.stringify(error)).message,
				});
			});
	};

	const updateCurso = () => {
		Axios.put('http://localhost:3001/api/curso/update', {
			id: id,
			nombre: nombre,
			description: description,
			precio: precio,
		})
			.then(() => {
				getCursos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html: '<i>El curso<strong>' + nombre + '</strong> fue actualizado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text:
						JSON.parse(JSON.stringify(error)).message === 'Network Error'
							? 'Intente mas tarde'
							: JSON.parse(JSON.stringify(error)).message,
				});
			});
	};

	const deleteCurso = (val) => {
		Swal.fire({
			title: 'Confirmar eliminado?',
			html: '<i>Realmente desea eliminar a <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminarlo!',
		}).then((result) => {
			if (result.isConfirmed) {
				Axios.delete(`http://localhost:3001/api/curso/delete/${val._id}`)
					.then(() => {
						getCursos();
						limpiarCampos();
						Swal.fire({
							icon: 'success',
							title: val.nombre + ' fue eliminado.',
							showConfirmButton: false,
							timer: 2000,
						});
					})
					.catch(function (error) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'No se logro eliminar el usuario!',
							footer:
								JSON.parse(JSON.stringify(error)).message === 'Network Error'
									? 'Intente mas tarde'
									: JSON.parse(JSON.stringify(error)).message,
						});
					});
			}
		});
	};

	useEffect(() => {
		getCursos();
	}, []);

	const getCursos = () => {
		Axios.get('http://localhost:3001/api/curso/cursos')
			.then((response) => {
				setCursos(response.data.cursos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const validar = (event) => {
		event.preventDefault();
		if (nombre.trim() === '' || description.trim() === '' || precio === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operation === 1) {
				addCurso();
			}

			if (operation === 2) {
				updateCurso();
			}

			document.getElementById('btnCerrar').click();
			getCursos();
		}
	};

	const openModal = (op, id, nombre, description, precio) => {
		setId('');
		setNombre('');
		setDescription('');
		setPrecio('');
		setOperation(op);
		if (op === 1) {
			setTitle('Registrar Curso');
		} else if (op === 2) {
			setId(id);
			setTitle('Editar Curso');
			setNombre(nombre);
			setDescription(description);
			setPrecio(precio);
		}
		window.setTimeout(function () {
			document.getElementById('nombre').focus();
		}, 500);
	};

	return (
		<div className='container-fluid '>
			<div className='row mt-3'>
				<div className='col-md-4 offset-md-4'>
					<div className='d-grid mx-auto'>
						<button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalCursos'>
							<i className='fa-solid fa-circle-plus'></i> Añadir nuevo Curso
						</button>
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
										<th>Descripción</th>
										<th>Precio</th>
										<th>Acciones</th>
									</tr>
								</thead>
								<tbody className='table-group-divider'>
									{cursosList.map((val) => {
										return (
											<tr key={val._id}>
												<td>{val._id}</td>
												<td>{val.nombre}</td>
												<td>{val.description}</td>
												<td>{val.precio} USD</td>
												<td>
													<button
														type='button'
														onClick={() => {
															openModal(2, val._id, val.nombre, val.description, val.precio);
														}}
														className='btn btn-warning'
														data-bs-toggle='modal'
														data-bs-target='#modalCursos'
													>
														<i className='fa fa-edit'></i>
														Editar
													</button>
													<span style={{ marginRight: '0px' }}></span>{' '}
													<button
														type='button'
														onClick={() => {
															deleteCurso(val);
														}}
														className='btn btn-danger'
													>
														<i className='fa fa-trash'></i>
														Eliminar
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div id='modalCursos' className='modal fade animate__animated animate__fadeIn' aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<label className='h5'>{title}</label>
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
									<span className='input-group-text'>Descripción:</span>
									<input
										type='text'
										id='description'
										className='form-control'
										placeholder='Ingrese una description'
										value={description}
										onChange={(event) => setDescription(event.target.value)}
									></input>
								</div>

								<div className='input-group mb-3'>
									<span className='input-group-text'>Precio:</span>
									<input
										type='number'
										id='precio'
										className='form-control'
										placeholder='Ingrese un precio'
										value={precio}
										onChange={(event) => setPrecio(event.target.value)}
									></input>
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
