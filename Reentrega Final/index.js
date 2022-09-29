import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {router} from "./src/routes/index.js";
import {engine} from "express-handlebars";
import * as mongo from "./src/connectors/mongoose.js";
import {middlewares} from "./src/middlewares/index.js";
import * as http from 'http';
import { Server } from 'socket.io';
import {initIO} from "./src/socket/index.js";

const app = express();

mongo.startConnection();

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(middlewares);
app.use(router);

const server = new http.Server(app);
const ioConnection = new Server(server);

initIO(ioConnection)

server.listen(process.env.PORT, () => {
    console.info('Server started!')
})


