const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
	nombre: {
		type: String,
		required: true,
	},
	cantidad: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

ProductoSchema.methods.toJSON = function () {
	const { __v, _id, ...producto } = this.toObject();
	producto.uid = _id;
	return producto;
};

module.exports = model('Producto', ProductoSchema);
