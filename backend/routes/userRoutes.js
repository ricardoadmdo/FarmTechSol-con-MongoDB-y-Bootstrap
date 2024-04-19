const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
	createUserRegister,
	loginUsuario,
	getUsuarios,
	createUser,
	updateUser,
	deleteUser,
	changeName,
} = require('../controllers/userController.js');
const { validarCampos } = require('../middlewares/validar-campos.js');

router.post(
	'/createUserRegister',
	[
		//middlewares
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 8 caracteres').isLength({
			min: 8,
		}),
		validarCampos,
	],
	createUserRegister
);

router.post(
	'/loginUsuario',
	[
		//middlewares
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 8 caracteres').isLength({
			min: 8,
		}),
		validarCampos,
	],
	loginUsuario
);

router.get('/usuarios', getUsuarios);
router.post('/create', createUser);
router.put('/update', updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/change', changeName);

module.exports = router;
