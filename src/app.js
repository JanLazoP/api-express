import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import sequelize from './config/db.js';
import userRouters from './routes/userRouters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '.env')});
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express();
app.use(express.json());

app.use('/api/users', userRouters);

const iniciarServidor = async () => {
    try{
        await sequelize.sync({alter: true });
        console.log('conexion a pg establecida y tablas sincronizadas');

        const PORT = process.env.PORT

        app.listen(PORT, () => {
            console.log(`servidor activo ejecutandose en http://localhost:${PORT}`);
        });
    }catch(error){
        console.error('no se pudo conectar a la base de datos', error.message);
    }
}

iniciarServidor();