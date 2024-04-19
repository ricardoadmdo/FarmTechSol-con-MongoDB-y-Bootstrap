const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
    getCursos,
    createCurso,
    updateCurso,
    deleteCurso,
} = require("../controllers/cursoController.js");
const { validarCampos } = require("../middlewares/validar-campos.js");

router.get("/cursos", getCursos);
router.post("/create", createCurso);
router.put("/update", updateCurso);
router.delete("/delete/:id", deleteCurso);

module.exports = router;
