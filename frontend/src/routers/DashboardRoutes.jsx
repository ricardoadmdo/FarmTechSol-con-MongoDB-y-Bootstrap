import { Navbar } from '../components/ui/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import { CRUDUsuario } from '../components/usuario/CRUDUsuario.jsx';
import { About } from '../components/about/About.jsx';
import { Curso } from '../components/cursos/Curso.jsx';
import { CRUDCurso } from '../components/cursos/CRUDCurso.jsx';
import { Productos } from '../components/producto/Productos.jsx';
import { CRUDProducto } from '../components/producto/CRUDProducto.jsx';
import { Carrito } from '../components/producto/Carrito.jsx';
import { Perfil } from '../components/usuario/Perfil.jsx';
import Footer from '../components/footer/Footer.jsx';

export const DashboardRoutes = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path='about' element={<About />} />
				<Route path='perfil' element={<Perfil />} />
				<Route path='AdminCurso' element={<CRUDCurso />} />
				<Route path='cursos' element={<Curso />} />
				<Route path='usuarios' element={<CRUDUsuario />} />
				<Route path='compra' element={<Productos />} />
				<Route path='producto' element={<CRUDProducto />} />
				<Route path='carrito' element={<Carrito />} />
			</Routes>
			<Footer />
		</>
	);
};
