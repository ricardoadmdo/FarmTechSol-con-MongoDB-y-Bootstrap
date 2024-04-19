import Ricardo from '../../images/Ricardo.jpg';
import Farm from '../../images/Farm.jfif';

export const About = () => {
	return (
		<>
			<div className='containerrr animate__animated animate__fadeIn'>
				<h1>Acerca de FarmTechSol</h1>
				<p>
					FarmTechSol es una empresa dedicada a la venta de productos de tecnología
					agrícola, como drones, sensores, sistemas de riego, entre otros.Nuestra misión
					es ayudar a los agricultores a mejorar su productividad y sostenibilidad
					mediante el uso de soluciones innovadoras y eficientes.
				</p>
				<hr />
				<div className='card-body'>
					<img src={Farm} alt='Logo de FarmTechSol' />
				</div>
				<br />
				<h2>Desarrollador de la web</h2>
				<p>
					Esta web fue desarrollada como proyecto final del curso de Programación Web en
					la Universidad de las Ciencias Informáticas en La Habana Cuba, por el estudiante
					Ricardo Alejandro D`Escoubet Montes de Oca. Fue mas que todo una practica para
					comenzar en el mundo del desarrollo web con las tecnologías: ReactJS,
					Javascript, Bootstrap, NodeJS, Express, MongoDB.
				</p>

				<div className='boddd'>
					<div className='CARDD'>
						<img src={Ricardo} />
						<div>
							<h2>Ricardo Alejandro D`Escoubet</h2>
							<h3>Desarrollador Backend</h3>
							<p>
								Se encarga de la lógica detrás del sitio, maneja bases de datos y
								servidores.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
