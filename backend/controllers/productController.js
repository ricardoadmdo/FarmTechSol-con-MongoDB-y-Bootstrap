const { response } = require('express');
const Producto = require('../models/Producto.js');

const getProductos = async (req, res = response) => {
	const productos = await Producto.find().populate('nombre');
	res.json({
		ok: true,
		productos,
	});
};

const createProduct = async (req, res = response) => {
	const { nombre, precio, description, cantidad, url } = req.body;

	try {
		const producto = new Producto({
			nombre,
			precio,
			description,
			cantidad,
			url,
		});

		const productoGuardado = await producto.save();
		res.json({
			ok: true,
			producto: productoGuardado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Ya existe un usuario con ese correo, por favor use otro',
		});
	}
};
const updateProduct = async (req, res = response) => {
	const { id: productoId, nombre, cantidad, description, precio, url } = req.body;
	try {
		const producto = await Producto.findById(productoId);
		if (!producto) {
			return res.status(400).json({
				ok: false,
				msg: 'Producto no existe por ese id',
			});
		}

		const nuevoProducto = {
			nombre,
			cantidad,
			description,
			precio,
			url,
		};

		const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevoProducto, {
			new: true,
		});

		res.json({
			ok: true,
			producto: productoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const deleteProduct = async (req, res = response) => {
	const productoId = req.params.id;

	try {
		const producto = await Producto.findById(productoId);

		if (!producto) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un producto con ese id',
			});
		}

		await Producto.findByIdAndDelete(productoId);

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const comprarProducto = async (req, res = response) => {
	console.log(req.body);
	const productoId = req.body.id;
	const cantidadADisminuir = req.body.cantidad;
	try {
		const producto = await Producto.findById(productoId);
		// Si el producto no existe, enviar un mensaje de error
		if (!producto) {
			return res.status(400).json({
				ok: false,
				msg: 'Producto no existe por ese id',
			});
		}

		// Si la cantidad del producto es menor que la cantidad a disminuir, enviar un mensaje de que no hay suficiente stock
		if (producto.cantidad < cantidadADisminuir) {
			return res.status(400).json({
				ok: false,
				msg: 'No hay suficiente stock del producto',
			});
		}

		// Disminuir la cantidad del producto en la cantidad especificada
		producto.cantidad -= cantidadADisminuir;

		// Guardar el producto actualizado en la base de datos
		const productoActualizado = await producto.save();

		// Enviar la respuesta con el producto actualizado
		res.json({
			ok: true,
			producto: productoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	getProductos,
	createProduct,
	updateProduct,
	deleteProduct,
	comprarProducto,
};
