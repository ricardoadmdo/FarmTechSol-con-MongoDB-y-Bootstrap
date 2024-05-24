import Ricardo from '../../images/Ricardo.jpg';
import Farm from '../../images/Farm.jfif';

export const About = () => {
	return (
		<>
			<div className='container animate__animated animate__fadeIn my-5'>
				<h1 className='text-center mb-4'>Acerca de FarmTechSol</h1>
				<p className='text-justify'>
					FarmTechSol es una empresa dedicada a la venta de productos de tecnología agrícola, como drones, sensores, sistemas de riego,
					entre otros. Nuestra misión es ayudar a los agricultores a mejorar su productividad y sostenibilidad mediante el uso de soluciones
					innovadoras y eficientes.
				</p>
				<hr />
				<div className='card-body text-center'>
					<img src={Farm} alt='Logo de FarmTechSol' className='img-fluid' />
				</div>
				<h2 className='text-center mt-4'>Desarrollador de la web</h2>
				<p className='text-justify'>
					Esta web fue desarrollada como proyecto final del curso de Programación Web en la Universidad de las Ciencias Informáticas en La
					Habana Cuba, por el estudiante Ricardo Alejandro D`Escoubet Montes de Oca. Fue más que todo una práctica para comenzar en el mundo
					del desarrollo web con las tecnologías: ReactJS, Javascript, Bootstrap, NodeJS, Express, MongoDB.
				</p>

				<div className='d-flex justify-content-center align-items-center flex-wrap my-5'>
					<div className='card m-3' style={{ maxWidth: '540px' }}>
						<div className='row g-0'>
							<div className='col-md-4'>
								<img src={Ricardo} className='img-fluid rounded-start' alt='...' />
							</div>
							<div className='col-md-8'>
								<div className='card-body'>
									<h2 className='card-title'>Ricardo Alejandro D`Escoubet</h2>
									<h3 className='card-subtitle mb-2 text-muted'>Desarrollador FullStack</h3>
									<p className='card-text'>Desarrollador de la web.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
