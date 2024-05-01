const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario.js');
const { generarJWT } = require('../helpers/jwt.js');

const createUserRegister = async (req, res = response) => {
	const { password, nombre, email } = req.body;

	try {
		let usuario = await Usuario.findOne({ nombre });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe un usuario con ese nombre',
			});
		}
		const rol = 'Usuario';
		usuario = new Usuario({ password, nombre, email, rol });

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);
		await usuario.save();

		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.nombre);
		res.status(201).json({
			ok: true,
			uid: usuario.id,
			nombre: usuario.nombre,
			rol: 'Usuario',
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor contacte al administrador',
		});
	}
};

const loginUsuario = async (req, res = response) => {
	const { email, password } = req.body;
	let usuario;
	try {
		usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email',
			});
		}

		const validPassword = bcrypt.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto',
			});
		}
		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.nombre);

		res.json({
			ok: true,
			uid: usuario.id,
			nombre: usuario.nombre,
			rol: usuario.rol,
			email: usuario.email,
			token,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Por favor contacte al administrador',
		});
	}
};

const changeName = async (req, res = response) => {
	const { id: usuarioId, nombre } = req.body;
	try {
		const usuario = await Usuario.findById(usuarioId);
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Usuario no existe por ese id',
			});
		}
		const nuevoUsuario = {
			nombre,
		};

		const usuarioActualizado = await Usuario.findByIdAndUpdate(
			usuarioId,
			nuevoUsuario,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const getUsuarios = async (req, res = response) => {
	const usuarios = await Usuario.find().populate('nombre');
	res.json({
		ok: true,
		usuarios,
	});
};

const createUser = async (req, res = response) => {
	const { nombre, password, email, rol } = req.body;

	try {
		const usuario = new Usuario({ nombre, password, email, rol });
		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		usuario.user = req.uid;
		const usuarioGuardado = await usuario.save();
		res.json({
			ok: true,
			usuario: usuarioGuardado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Ya existe un usuario con ese correo, por favor use otro',
		});
	}
};
const updateUser = async (req, res = response) => {
	const { id: usuarioId, nombre, email, rol } = req.body;
	try {
		const usuario = await Usuario.findById(usuarioId);
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Usuario no existe por ese id',
			});
		}

		const nuevoUsuario = {
			nombre,
			email,
			rol,
		};

		const usuarioActualizado = await Usuario.findByIdAndUpdate(
			usuarioId,
			nuevoUsuario,
			{
				new: true,
			}
		);

		res.json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const deleteUser = async (req, res = response) => {
	const usuarioId = req.params.id;

	try {
		const usuario = await Usuario.findById(usuarioId);

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'No existe un usuario con ese id',
			});
		}

		await Usuario.findByIdAndDelete(usuarioId);

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

module.exports = {
	createUserRegister,
	loginUsuario,
	getUsuarios,
	createUser,
	updateUser,
	deleteUser,
	changeName,
};
