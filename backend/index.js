const { styleText } = require('node:util');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config.js');
process.loadEnvFile(); //Leyendo el .env sin necesidad del dotenv  // require("dotenv").config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

// Middleware para agregar el encabezado Content-Type con charset UTF-8
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	next();
});

//Rutas
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/product', require('./routes/productRoutes.js'));
app.use('/api/curso', require('./routes/cursoRoutes.js'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(
		styleText('blue', `Backend corriendo en el puerto: ${process.env.PORT}`)
	);
});
