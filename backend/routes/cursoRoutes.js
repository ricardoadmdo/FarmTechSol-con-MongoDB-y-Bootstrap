const express = require('express');
const router = express.Router();
const { getCursos, createCurso, updateCurso, deleteCurso } = require('../controllers/cursoController.js');

router.get('/cursos', getCursos);
router.post('/create', createCurso);
router.put('/update/:id', updateCurso);
router.delete('/delete/:id', deleteCurso);

module.exports = router;
