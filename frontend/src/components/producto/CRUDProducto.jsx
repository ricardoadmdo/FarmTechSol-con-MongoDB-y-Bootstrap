import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const CRUDProducto = () => {
	const [nombre, setNombre] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [description, setDescription] = useState('');
	const [precio, setPrecio] = useState('');
	const [url, setUrl] = useState('');
	const [id, setId] = useState('');
	const [operation, setOperation] = useState(1);
	const [productosList, setProductos] = useState([]);
	const [title, setTitle] = useState('');

	const limpiarCampos = () => {
		setCantidad('');
		setNombre('');
		setDescription('');
		setPrecio('');
		setUrl('');
		setId('');
	};

	const addProductos = () => {
		Axios.post('http://localhost:3001/api/product/create', {
			cantidad: cantidad,
			nombre: nombre,
			description: description,
			precio: precio,
			url: url,
		})
			.then(() => {
				getProductos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html:
						'<i>El producto <strong>' +
						nombre +
						'</strong> fue registrado con éxito</i>',
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

	const updateProductos = () => {
		Axios.put('http://localhost:3001/api/product/update', {
			id: id,
			cantidad: cantidad,
			nombre: nombre,
			description: description,
			precio: precio,
			url: url,
		})
			.then(() => {
				getProductos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html:
						'<i>El producto <strong>' +
						nombre +
						'</strong> fue actualizado con éxito</i>',
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

	const deleteProductos = val => {
		Swal.fire({
			title: 'Confirmar eliminado?',
			html: '<i>Realmente desea eliminar a <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminarlo!',
		}).then(result => {
			if (result.isConfirmed) {
				Axios.delete(`http://localhost:3001/api/product/delete/${val._id}`)
					.then(() => {
						getProductos();
						limpiarCampos();
						Swal.fire({
							icon: 'success',
							title: 'El producto ' + val.nombre + ' fue eliminado.',
							showConfirmButton: false,
							timer: 2000,
						});
					})
					.catch(function (error) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'No se logro eliminar el producto!',
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
		getProductos();
	}, []);

	const getProductos = () => {
		Axios.get('http://localhost:3001/api/product/products')
			.then(response => {
				setProductos(response.data.productos);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const validar = event => {
		event.preventDefault();
		if (
			nombre.trim() === '' ||
			cantidad === '' ||
			description.trim() === '' ||
			precio === '' ||
			url.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operation === 1) {
				addProductos();
			}

			if (operation === 2) {
				updateProductos();
			}

			document.getElementById('btnCerrar').click();
			getProductos();
		}
	};

	const openModal = (op, id, nombre, cantidad, description, precio, url) => {
		setId('');
		setNombre('');
		setCantidad('');
		setDescription('');
		setPrecio('');
		setUrl('');
		setOperation(op);
		if (op === 1) {
			setTitle('Registrar Producto');
		} else if (op === 2) {
			setId(id);
			setTitle('Editar Producto');
			setNombre(nombre);
			setCantidad(cantidad);
			setDescription(description);
			setPrecio(precio);
			setUrl(url);
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
						<button
							onClick={() => openModal(1)}
							className='btn btn-dark'
							data-bs-toggle='modal'
							data-bs-target='#modalProductos'
						>
							<i className='fa-solid fa-circle-plus'></i> Añadir nuevo Producto
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
										<th>Precio</th>
										<th>Descripción</th>
										<th>Cantidad</th>
										<th>Url</th>
										<th>Acciones</th>
									</tr>
								</thead>
								<tbody className='table-group-divider'>
									{productosList.map(val => {
										return (
											<tr key={val._id}>
												<td>{val._id}</td>
												<td>{val.nombre}</td>
												<td>{val.precio} USD</td>
												<td>
													{val.description.length > 50
														? `${val.description.slice(0, 100)}...`
														: val.description}
												</td>
												<td>{val.cantidad} Unidades</td>
												<td>
													{val.url.length > 50
														? `${val.url.slice(0, 50)}...`
														: val.url}
												</td>
												<td>
													<button
														type='button'
														onClick={() => {
															openModal(
																2,
																val._id,
																val.nombre,
																val.cantidad,
																val.description,
																val.precio,
																val.url
															);
														}}
														className='btn btn-warning'
														data-bs-toggle='modal'
														data-bs-target='#modalProductos'
													>
														<i className='fa fa-edit'></i>
														Editar
													</button>
													<button
														type='button'
														onClick={() => {
															deleteProductos(val);
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
			<div
				id='modalProductos'
				className='modal fade animate__animated animate__fadeIn'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<label className='h5'>{title}</label>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							>
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
										onChange={event => setNombre(event.target.value)}
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
										onChange={event => setPrecio(event.target.value)}
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
										onChange={event => setDescription(event.target.value)}
									></input>
								</div>

								<div className='input-group mb-3'>
									<span className='input-group-text'>Cantidad:</span>
									<input
										type='number'
										id='cantidad'
										className='form-control'
										placeholder='Ingrese una cantidad'
										value={cantidad}
										onChange={event => setCantidad(event.target.value)}
									></input>
								</div>

								<div className='input-group mb-3'>
									<span className='input-group-text'>Url:</span>
									<input
										type='text'
										id='url'
										className='form-control'
										placeholder='Ingrese una url'
										value={url}
										onChange={event => setUrl(event.target.value)}
									></input>
								</div>
							</form>
							<div className='d-grid col-6 mx-auto'>
								<button type='submit' form='Form' className='btn btn-success'>
									<i className='fa fa-floppy-disk'></i> Guardar
								</button>
							</div>

							<div className='modal-footer'>
								<button
									id='btnCerrar'
									type='button'
									className='btn btn-secondary'
									data-bs-dismiss='modal'
								>
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
