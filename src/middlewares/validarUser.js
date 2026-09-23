import { body, validationResult } from 'express-validator';

export const validarRegistro = [
    body('nombre').notEmpty().withMessage('el nombre es obligatorio'),
    body('email').isEmail().withMessage('debe ser correo valido'),
    body('password').isLength({min: 6}).withMessage('el password debe tener al menos 6 caractares'),

    (req,res, next) => {
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()});
        }
        next();
    }
]