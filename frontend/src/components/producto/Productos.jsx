import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Axios from 'axios';
import Swal from 'sweetalert2';
import placeholder from '../../images/placeholder.png';

export const Productos = () => {
	const [cantidad, setCantidad] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const { addToCart } = useContext(AuthContext);
	const [productosList, setProductos] = useState([]);
	const [filters, setFilters] = useState({
		minPrecio: 0,
	});

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

	const comprarProductos = (id, val, cantidad) => {
		if (val.cantidad <= 0) {
			Swal.fire({
				title: 'Producto agotado',
				html: '<i>Lo sentimos, el producto <strong>' + val.nombre + '</strong> no está disponible</i>',
				icon: 'error',
				confirmButtonText: 'Aceptar',
			});
		} else if (val.cantidad < cantidad) {
			Swal.fire({
				title: 'No puedes comprar más productos de los disponibles',
				html: '<i>Lo sentimos, no tenemos disponible esa cantidad del producto <strong>' + val.nombre + '</strong></i>',
				icon: 'error',
				confirmButtonText: 'Aceptar',
			});
		} else {
			Swal.fire({
				title: 'Confirmar compra',
				html: '<i>¿Realmente desea comprar el producto <strong>' + val.nombre + '</strong>?</i>',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sí, comprar',
			}).then((result) => {
				if (result.isConfirmed) {
					Axios.put('http://localhost:3001/api/product/comprar', {
						cantidad: cantidad,
						id: id,
					})
						.then(() => {
							getProductos();
							Swal.fire({
								title: '<strong>Producto comprado</strong>',
								html: '<i>El producto <strong>' + val.nombre + '</strong> fue comprado con éxito</i>',
								icon: 'success',
								timer: 3000,
							});
						})
						.catch((error) => {
							// Mover el catch aquí
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'No se logró realizar la compra',
								footer: error.message === 'Network Error' ? 'Intente más tarde' : error.message,
							});
						});
				}
			});
		}
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};
	//Filtrado por precio

	const handleChangeMinPrecio = (event) => {
		setFilters({
			...filters,
			minPrecio: event.target.value,
		});
	};

	const filterProducts = (products) => {
		return products.filter((product) => {
			return product.precio >= filters.minPrecio && product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
		});
	};

	const filteredProducts = filterProducts(productosList);

	return (
		<div className='animate__animated animate__fadeIn'>
			<div className='marquee-container'>
				<span className='marquee-text'>
					Bienvenido a FarmTechSol, la empresa de venta de productos de tecnología Agrícola avanzada más importante del país. ¡Descuentos
					solo por hoy! No se lo pierda.
				</span>
			</div>
			<div className='product '>
				<div style={{ position: 'absolute', top: '110px', left: '20px' }}>
					<label htmlFor='precio'>Precio a partir de:</label>
					<input type='range' id='precio' min='0' max='4000' onChange={handleChangeMinPrecio} />
					<span>${filters.minPrecio}</span>
					<span style={{ marginRight: '970px' }}></span>
					<input type='text' placeholder='Buscar por nombre' value={searchTerm} onChange={handleSearch} />
					<FontAwesomeIcon icon={faSearch} style={{ marginLeft: '5px', cursor: 'pointer' }} />
				</div>
				{filteredProducts.map((val) => (
					<div key={val._id}>
						<div className='col m-3'>
							<div className='cardP' style={{ width: '300px' }}>
								<h5 className='card-title'>
									<strong>{val.nombre}</strong>
								</h5>

								<LazyLoadImage
									threshold={10}
									effect='blur'
									placeholderSrc={placeholder}
									src={val.url}
									className='card-img-top'
									alt='Imagen del producto'
								/>

								<div className='card-body'>
									<p className='card-text'>
										<strong>Descripción:</strong> {val.description}
									</p>
									<p className='card-text'>
										<strong>Cantidad:</strong> {val.cantidad}
									</p>
									<p className='card-text'>
										<strong>Precio:</strong> {val.precio} USD
									</p>
									<hr />
									<div className='container'>
										<div className='row align-items-center'>
											<div className='col-4'>
												<input
													type='number'
													className='form-control'
													placeholder='Cantidad'
													min='1'
													defaultValue='1'
													onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
												/>
											</div>
											<div className='col-8'>
												<div className='input-group'>
													<button
														aria-label='añadir al carrito'
														className=' btn btn-outline-dark'
														onClick={() => addToCart(val, Number(cantidad))}
													>
														<FontAwesomeIcon icon={faShoppingCart} />
													</button>
													<span style={{ marginRight: '5px' }}></span> {/* Espacio entre los botones */}
													<button className='btn btn-success' onClick={() => comprarProductos(val._id, val, cantidad)}>
														Comprar
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
