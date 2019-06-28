import http from 'http';
import Api from './api/api';
import { sequelize } from './models';
// This code is the start code of our API, it calls the models (with the Sequelize database configurations),
// calls the config.ts (chooses the API configuration), and creates and starts the server passing the API settings.

// const models = require('./models');

const server = http.createServer(Api);

sequelize.sync().then(() => {
  server.listen(process.env.SERVER_PORT);

  server.on('listening', () => console.log(`server listing ${process.env.SERVER_PORT}`));
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error: ${error}`));
});
