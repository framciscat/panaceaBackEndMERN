const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require ("swagger-ui-express");



const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'Crossfit WOD API', version: '1.0.0'},


    },
    apis: ['src/routes/History.ts'],
};

// Docs en JSON format

const swaggerSpec = swaggerJSdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/histories/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('histories/docs.json', (req, res) => {
        res.setHeader('ContentType', 'application/json');
        res.send(swaggerSpec);
    })

    console.log('Version 1 Docs are available at http://localhost:${port}/histories/docs');
};

module.exports = {swaggerDocs};