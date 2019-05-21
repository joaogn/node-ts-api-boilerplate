import * as http from 'http';
import Api from './api/api';

const models =  require('./models');

const config = require('./config/env/config')();

const server = http.createServer(Api);

models.sequelize.sync().then(() => {

    server.listen(config.serverPort);

    server.on('listening', () => console.log(`server listing ${config.serverPort}`));
    server.on('error',(error: NodeJS.ErrnoException) => console.log(`Error: ${error}`));


});

