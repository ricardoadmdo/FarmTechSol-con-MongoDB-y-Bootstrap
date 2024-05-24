const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
	nombre: {
		type: String,
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
});

CursoSchema.methods.toJSON = function () {
	const { __v, _id, ...curso } = this.toObject();
	curso.uid = _id;
	return curso;
};

module.exports = model('Curso', CursoSchema);
