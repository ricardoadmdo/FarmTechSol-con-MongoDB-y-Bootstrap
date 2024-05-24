import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import TablaCRUD from '../reutilizable-tablaCrud/TablaCRUD.jsx';

export const CRUDCurso = () => {
	const [id, setId] = useState('');
	const [formState, setFormState] = useState({
		nombre: '',
		description: '',
		precio: '',
	});
	const [operationMode, setOperationMode] = useState(1);
	const [cursosList, setCursos] = useState([]);
	const [title, setTitle] = useState('');

	const limpiarCampos = () => {
		setFormState({
			nombre: '',
			description: '',
			precio: '',
		});
	};

	const addCurso = () => {
		Axios.post('http://localhost:3001/api/curso/create', formState)
			.then(() => {
				getCursos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>El curso <strong>' + formState.nombre + '</strong> fue registrado con éxito</i>',
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
		Axios.put(`http://localhost:3001/api/curso/update/${id}`, formState)
			.then(() => {
				getCursos();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html: '<i>El curso<strong>' + formState.nombre + '</strong> fue actualizado con éxito</i>',
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
				Axios.delete(`http://localhost:3001/api/curso/delete/${val.uid}`)
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
		const { nombre, description, precio } = formState;
		if (nombre.trim() === '' || description.trim() === '' || precio === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operationMode === 1) {
				addCurso();
			}

			if (operationMode === 2) {
				updateCurso();
			}

			document.getElementById('btnCerrar').click();
			getCursos();
		}
	};

	const openModal = (op, curso) => {
		setFormState({
			nombre: op === 2 ? curso.nombre : '',
			description: op === 2 ? curso.description : '',
			precio: op === 2 ? curso.precio : '',
		});
		setOperationMode(op);
		setTitle(op === 1 ? 'Registrar Producto' : 'Editar Producto');

		// Si es modo de edición, establece el ID
		if (op === 2) {
			setId(curso.uid);
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
				data={cursosList}
				onAdd={() => openModal(1)}
				columns={[
					{ header: 'ID', accessor: 'uid' },
					{ header: 'Nombre', accessor: 'nombre' },
					{ header: 'Descripción', accessor: 'description' },
					{ header: 'Precio', accessor: 'precio' },
				]}
				onEdit={(curso) => openModal(2, curso)}
				onDelete={deleteCurso}
				title={title}
				modalTitle='Añadir nuevo Curso'
				validate={validar}
				operationMode={operationMode}
				setOperationMode={setOperationMode}
				formFields={[
					{ name: 'nombre', label: 'Nombre', placeholder: 'Ingrese un nombre', type: 'text' },
					{ name: 'description', label: 'Descripción', placeholder: 'Ingrese una descripción', type: 'text' },
					{ name: 'precio', label: 'Precio', placeholder: 'Ingrese un precio', type: 'number' },
				]}
				formState={formState}
				setFormState={setFormState}
			/>
		</>
	);
};
