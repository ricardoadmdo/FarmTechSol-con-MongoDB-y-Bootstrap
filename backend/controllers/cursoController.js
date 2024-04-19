const { response } = require("express");
const Curso = require("../models/Curso.js");

const getCursos = async (req, res = response) => {
    const cursos = await Curso.find().populate("nombre");
    res.json({
        ok: true,
        cursos,
    });
};

const createCurso = async (req, res = response) => {
    const { nombre, precio, description } = req.body;

    try {
        const curso = new Curso({
            nombre,
            precio,
            description,
        });

        const cursoGuardado = await curso.save();
        res.json({
            ok: true,
            curso: cursoGuardado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin",
        });
    }
};
const updateCurso = async (req, res = response) => {
    const { id: cursoId, nombre, description, precio } = req.body;
    try {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(400).json({
                ok: false,
                msg: "Curso no existe por ese id",
            });
        }

        const nuevoCurso = {
            nombre,
            description,
            precio,
        };

        const cursoActualizado = await Curso.findByIdAndUpdate(
            cursoId,
            nuevoCurso,
            { new: true }
        );

        res.json({
            ok: true,
            curso: cursoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const deleteCurso = async (req, res = response) => {
    const cursoId = req.params.id;

    try {
        const curso = await Curso.findById(cursoId);

        if (!curso) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un curso con ese id",
            });
        }

        await Curso.findByIdAndDelete(cursoId);

        res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

module.exports = {
    getCursos,
    createCurso,
    updateCurso,
    deleteCurso,
};
