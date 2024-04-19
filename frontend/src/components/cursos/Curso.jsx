import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Axios from 'axios';
import Swal from 'sweetalert2';
import placeholder from '../../images/placeholder.png';

export const Curso = () => {
	const [cursosList, setCursos] = useState([]);
	const { addToCart } = useContext(AuthContext);

	useEffect(() => {
		getCursos();
	}, []);

	const getCursos = () => {
		Axios.get('http://localhost:3001/api/curso/cursos')
			.then(response => {
				setCursos(response.data.cursos);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const comprarCurso = (id, val) => {
		Swal.fire({
			title: 'Confirmar compra?',
			html: '<i>Realmente desea comprar el curso <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, comprar!',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire({
					title: '<strong>Curso comprado!!!</strong>',
					html:
						'<i>El curso <strong>' +
						val.nombre +
						'</strong> fue comprado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			}
		});
	};

	return (
		<>
			<div className='cursos animate__animated animate__fadeIn'>
				{cursosList.map(val => (
					<div key={val._id}>
						<div className='col m-3 '>
							<div className='cardC' style={{ width: '18rem' }}>
								<h5 className='card-title'>
									<strong>{val.nombre}</strong>
								</h5>
								<LazyLoadImage
									effect='blur'
									placeholderSrc={placeholder}
									src='https://th.bing.com/th/id/OIG4.fKtEcTcnkwePDG4R5n1_?pid=ImgGn'
									className='card-img-top'
									alt='imagen de los cursos'
								/>
								<div className='card-body'>
									<p className='card-text'>
										<strong>Descripción:</strong> {val.description}
									</p>
									<p className='card-text'>
										<strong>Precio:</strong> {val.precio} USD
									</p>
									<hr />

									<div className='input-group-append'>
										<button
											className='btn btn-outline-dark'
											onClick={() => addToCart(val, Number(1))}
										>
											<FontAwesomeIcon icon={faShoppingCart} />
										</button>
										<span style={{ marginRight: '5px' }}></span>{' '}
										{/* Espacio entre los botones */}
										<button
											className='btn btn-success'
											onClick={() => comprarCurso(val.id, val)}
										>
											Comprar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
