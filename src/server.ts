import express from 'express';
import mongoose from 'mongoose';
import {config} from './config/config';
import Logging from './library/Logging';
import historyRoutes from'./routes/History';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';



export const router = express();


/**Conexión a Mongo */

export const connection = mongoose.connect(config.mongo.url)
.then(() => {
    Logging.info('Conectado a MongoDB');
    StartServer();
})
.catch(error => {
    Logging.error('No se ha podido establecer la conexión');
    Logging.error(error);
});

/**Iniciar el servidor si Mongo conecta */

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]
            - Status: [${res.status}]`);
        });
        next();
    });
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());


    /**Reglas de la API */

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS') {
            res.header ('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });


    //Rutas
    router.use('/histories', historyRoutes);
    router.use('/auth', authRoutes);

 

    //Servidor
    router.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

};


//Swagger

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));