const { Schema, model } = require("mongoose");

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

module.exports = model("Curso", CursoSchema);
