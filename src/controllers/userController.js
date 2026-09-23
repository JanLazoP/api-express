import Usuario from "../models/userModel";

export const obtenerUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password']}
        });
        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json({mensaje: 'error al obtener usuarios', error: error.message})
    }
};

export const crearUsuario = async (req,res) => {
    try{
        const{ nombre, email, password} = req.body;

        const existeEmail = await Usuario.findOne({ where: {email}});
        if (existeEmail){ 
            return res.status(400).json({mensaje:'el correo ya esta registrado'})
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, password});
        const { password: _, ...usuariosSinPassword} = nuevoUsuario.toJSON();

        res.status(201).json({mensaje: 'Usuario registrado con exito', usuario: usuariosSinPassword})
    }catch(error){
        res.status(500).json({mensaje: 'error al registrar usuario', error: error.message});
    }
}

export const actualizarUsuario = async (req,res) => {
    try{
        const { id } = req.params;
        const {nombre, email} = req.body;

        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        }

        await usuario.update({nombre, email});
        const { password: _, ...usuariosSinPassword} = usuario.toJSON();
        res.status(200).json({mensaje: 'usuario actualizado', usuario: usuariosSinPassword});

    }catch(error){
        res.status(500).json({mensaje: 'error al actualizar usuario', error: error.message});
    }
};

export const eliminarUsuario = async (req, res) => {
    try{
        const { id } = req.params;
        
        const filasEliminadas = await Usuario.destroy({ where: { id }});

        if(filasEliminadas === 0){
            return res.status(404).json({ mensaje: 'usuario no encontrado'});
        }

        res.status(200).json({mensaje: 'usuario eliminado'});
    }catch(error){
        res.status(500).json({ mensaje: 'error al eliminar usuario', error: error.message});
    }
}


