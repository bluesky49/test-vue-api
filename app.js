const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectToDatabase } = require("./src/db/connectDB")
const clientRouter = require("./src/clients/clients.router");
const providerRouter = require("./src/providers/providers.router");

const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'Client API',  
            description: "REST API built with Express and mock DB",
            version:'1.0.0'  
        }  
    },  
    apis: [__dirname + "/src/*/*.controller.js"],  
}  

const swaggerDocs = swaggerJSDoc(swaggerOptions);  
const app = express();
app.use(cors({maxAge: 6000}));
app.use(bodyParser.json());

app.use("/clients", clientRouter);
app.use("/providers", providerRouter);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  

connectToDatabase()
module.exports = app;
