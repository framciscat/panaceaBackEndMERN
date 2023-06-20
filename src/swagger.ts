import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import {Express} from 'express';


const options:SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
            info: {
                title: 'Documentación de APIS de Panacea',
                version: '1.0.0',
                description: 'Documentación de todas las APIS utilizadas en el proyecto Panacea',
            },
            servers:[
                {
                    url: "http://localhost:4000/api"
                }
            ]
    },
  apis: ['src/routes/History.ts'],
};

const specs = swaggerJsdoc(options);

export default function setupSwagger(app:Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}