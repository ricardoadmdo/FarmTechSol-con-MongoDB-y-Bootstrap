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
			.then((response) => {
				setCursos(response.data.cursos);
			})
			.catch((error) => {
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
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: '<strong>Curso comprado!!!</strong>',
					html: '<i>El curso <strong>' + val.nombre + '</strong> fue comprado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			}
		});
	};

	return (
		<>
			<div className='container animate__animated animate__fadeIn my-5'>
				<div className='row'>
					{cursosList.map((val) => (
						<div key={val._id} className='col-sm-6 col-md-4 col-lg-3 mb-4-3'>
							<div className='card h-100 shadow'>
								<h5 className='card-header'>{val.nombre}</h5>
								<LazyLoadImage
									effect='blur'
									placeholderSrc={placeholder}
									src='https://th.bing.com/th/id/OIG4.fKtEcTcnkwePDG4R5n1_?pid=ImgGn'
									className='card-img-top'
									alt='imagen de los cursos'
								/>
								<div className='card-body d-flex flex-column'>
									<p className='card-text'>
										<strong>Descripción:</strong> {val.description}
									</p>
									<p className='card-text'>
										<strong>Precio:</strong> {val.precio} USD
									</p>
									<hr />
									<div className='mt-auto'>
										<button className='btn btn-outline-dark' onClick={() => addToCart(val, Number(1))}>
											<FontAwesomeIcon icon={faShoppingCart} />
										</button>
										<button className='btn btn-success ml-2' onClick={() => comprarCurso(val.id, val)}>
											Comprar
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
