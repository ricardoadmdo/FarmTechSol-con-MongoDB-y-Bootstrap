import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FiltroBusqueda = ({ filters, searchTerm, handleChangeMinPrecio, handleSearch }) => {
	return (
		<div className='row'>
			{/* Columna del filtro */}
			<div className='col-md-2'>
				<div className='input-group'>
					<span className='input-group-text'>Precio a partir de: {filters.minPrecio} $</span>
					<input type='range' className='form-range' min='0' max='4000' value={filters.minPrecio} onChange={handleChangeMinPrecio} />
				</div>
			</div>
			{/* Espacio vacío en el medio */}
			<div className='col-md-7'></div>
			{/* Columna de la búsqueda */}
			<div className='col-md-3'>
				<div className='input-group'>
					<input type='text' className='form-control' placeholder='Buscar por nombre' value={searchTerm} onChange={handleSearch} />
					<button className='btn btn-outline-secondary' type='button'>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</div>
		</div>
	);
};

FiltroBusqueda.propTypes = {
	filters: PropTypes.object.isRequired, // filters es un objeto que contiene el estado de los filtros
	searchTerm: PropTypes.string.isRequired, // searchTerm es una cadena de texto
	handleChangeMinPrecio: PropTypes.func.isRequired, // handleChangeMinPrecio es una función
	handleSearch: PropTypes.func.isRequired, // handleSearch es una función
};

export default FiltroBusqueda;
