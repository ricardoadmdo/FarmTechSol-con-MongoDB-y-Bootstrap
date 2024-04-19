const { styleText } = require('node:util');
const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect('mongodb://localhost/FarmTechSol');

		console.log(styleText('blue', 'Base de Datos Online con MongoDB'));
	} catch (error) {
		console.log(error);
		throw new Error('Error al iniciar la Base de Datos!');
	}
};

module.exports = {
	dbConnection,
};
