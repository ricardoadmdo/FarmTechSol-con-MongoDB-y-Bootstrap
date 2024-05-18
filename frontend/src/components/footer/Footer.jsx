const Footer = () => {
	return (
		<footer
			style={{
				backgroundColor: '#222222',
				color: 'white',
				textAlign: 'center',
				padding: '10px',
				position: 'relative',
				left: '0',
				bottom: '0',
				width: '100%',
				marginTop: 'auto',
			}}
		>
			<p>
				Desarrollado por Ricardo Alejandro D´Escoubet Montes de Oca <a href='https://github.com/ricardoadmdo'>GitHub de Ricardo</a>{' '}
				{new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
