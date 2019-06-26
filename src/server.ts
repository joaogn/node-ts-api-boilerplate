import * as http from 'http';
import Api from './api/api';

// This code is the start code of our API, it calls the models (with the Sequelize database configurations),
// calls the config.ts (chooses the API configuration), and creates and starts the server passing the API settings.

const models = require('./models');

const config = require('./config/env/config')();

const server = http.createServer(Api);

models.sequelize.sync().then(() => {
  server.listen(config.serverPort);

  server.on('listening', () => console.log(`server listing ${process.env.SERVER_PORT}`));
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error: ${error}`));
});
