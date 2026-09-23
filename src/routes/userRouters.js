import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { validarRegistro } from '../middlewares/validarUser.js';

const router = Router;

router.get('/', userController.obtenerUsuarios);
router.post('/', validarRegistro, userController.crearUsuario);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

