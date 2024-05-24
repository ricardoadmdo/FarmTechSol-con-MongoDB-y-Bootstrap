import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import TablaCRUD from '../reutilizable-tablaCrud/TablaCRUD.jsx';

export const CRUDProducto = () => {
	const [id, setId] = useState('');
	const [formState, setFormState] = useState({
		nombre: '',
		cantidad: '',
		description: '',
		precio: '',
		url: '',
	});
	const [operationMode, setOperationMode] = useState(1);
	const [productosList, setProductos] = useState([]);
	const [title, setTitle] = useState('');

	const limpiarCampos = () => {
		setFormState({
			nombre: '',
			cantidad: '',
			description: '',
			precio: '',
			url: '',
		});
	};

	const addProductos = () => {
		Axios.post('http://localhost:3001/api/product/create', formState)
			.then(() => {
				getProductos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>El producto <strong>' + formState.nombre + '</strong> fue registrado con éxito</i>',
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
		Axios.put(`http://localhost:3001/api/product/update/${id}`, formState)
			.then(() => {
				getProductos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html: '<i>El producto <strong>' + formState.nombre + '</strong> fue actualizado con éxito</i>',
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

	const deleteProductos = (val) => {
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
				Axios.delete(`http://localhost:3001/api/product/delete/${val.uid}`)
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
			.then((response) => {
				setProductos(response.data.productos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const validar = (event) => {
		event.preventDefault();
		const { nombre, cantidad, description, precio, url } = formState;
		if (nombre.trim() === '' || cantidad === '' || description.trim() === '' || precio === '' || url.trim() === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operationMode === 1) {
				addProductos();
			}

			if (operationMode === 2) {
				updateProductos();
			}

			document.getElementById('btnCerrar').click();
			getProductos();
		}
	};

	const openModal = (op, producto) => {
		setFormState({
			nombre: op === 2 ? producto.nombre : '',
			cantidad: op === 2 ? producto.cantidad : '',
			description: op === 2 ? producto.description : '',
			precio: op === 2 ? producto.precio : '',
			url: op === 2 ? producto.url : '',
		});
		setOperationMode(op);
		setTitle(op === 1 ? 'Registrar Producto' : 'Editar Producto');

		// Si es modo de edición, establece el ID
		if (op === 2) {
			setId(producto.uid);
		} else {
			setId('');
		}

		// Enfoca el primer campo del formulario después de un breve retraso
		window.setTimeout(() => {
			document.getElementById('nombre').focus();
		}, 500);
	};

	return (
		<>
			<TablaCRUD
				data={productosList}
				onAdd={() => openModal(1)}
				columns={[
					{ header: 'ID', accessor: 'uid' },
					{ header: 'Nombre', accessor: 'nombre' },
					{ header: 'Cantidad', accessor: 'cantidad' },
					{ header: 'Descripción', accessor: 'description' },
					{ header: 'Precio', accessor: 'precio' },
					{ header: 'Url', accessor: 'url' },
				]}
				onEdit={(usuario) => openModal(2, usuario)}
				onDelete={deleteProductos}
				title={title}
				modalTitle='Añadir nuevo Producto'
				validate={validar}
				operationMode={operationMode}
				setOperationMode={setOperationMode}
				formFields={[
					{ name: 'nombre', label: 'Nombre', placeholder: 'Ingrese un nombre', type: 'text' },
					{ name: 'cantidad', label: 'Cantidad', placeholder: 'Ingrese la cantidad', type: 'number' },
					{ name: 'description', label: 'Descripción', placeholder: 'Ingrese una descripción', type: 'text' },
					{ name: 'precio', label: 'Precio', placeholder: 'Ingrese un precio', type: 'number' },
					{ name: 'url', label: 'Url', placeholder: 'Ingrese una url', type: 'text' },
				]}
				formState={formState}
				setFormState={setFormState}
			/>
		</>
	);
};
