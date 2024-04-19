import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import Swal from 'sweetalert2';

export const Carrito = () => {
	const { cart, removeFromCart, clearCart } = useContext(AuthContext);

	const total = cart.reduce((acc, val) => acc + val.precio * val.cantidadAdd, 0);

	const ComprarTodo = () => {
		const productosComprados = cart.map(val => ({
			nombre: val.nombre,
			cantidad: val.cantidadAdd,
		}));
		Swal.fire({
			title: 'Confirmar compra',
			html:
				'<i>¿Realmente desea comprar los siguientes productos?</i><br>' +
				productosComprados
					.map(
						producto =>
							`<strong>${producto.nombre}</strong> - Cantidad: ${producto.cantidad}`
					)
					.join('<br>'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, comprar',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire({
					title: '<strong>Compra exitosa</strong>',
					html:
						'<i>Los siguientes productos fueron comprados con éxito:</i><br>' +
						productosComprados
							.map(
								producto =>
									`<strong>${producto.nombre}</strong> - Cantidad: ${producto.cantidad}`
							)
							.join('<br>'),
					icon: 'success',
					timer: 3000,
				});
			}
		});
	};

	return (
		<>
			<div>
				<p>
					<strong>Valor Total de la Compra 🛒:</strong> {total} USD
				</p>
				<button className='btn btn-outline-dark' onClick={clearCart}>
					Vaciar Carrito
				</button>
				<button className='btn btn-success' onClick={ComprarTodo}>
					Comprar Todo
				</button>
			</div>
			<div className='product animate__animated animate__fadeIn'>
				{cart.map((val, index) => (
					<div key={val._id + '-' + index}>
						<div className='col m-3'>
							<div className='cardP' style={{ width: '300px' }}>
								<h5 className='card-title'>
									<strong>{val.nombre}</strong>
								</h5>
								<img src={val.url} className='card-img-top' alt='...' />
								<div className='card-body'>
									<p className='card-text'>
										<strong>Cantidad a comprar:</strong> {val.cantidadAdd}{' '}
									</p>
									<p className='card-text'>
										<strong>Precio:</strong> {val.precio} USD
									</p>

									<hr />
									<button
										className='btn btn-danger'
										onClick={() => removeFromCart(val._id)}
									>
										Quitar del Carrito
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
