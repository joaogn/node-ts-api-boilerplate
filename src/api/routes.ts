'use strict';

import { Application } from 'express';
import UserController from '../modules/user/controller';
import TokenRoutes from '../modules/auth/auth';

// Class responsible for starting the API routes, request authentication
// and call the modules responsible for executing the route

class Routes {
  constructor () {}

  initRoutes (app: Application, auth: any): void{
    app.route('/api/users/all').get(UserController.getAll);
    app.route('/api/users/create').post(UserController.createUser);
    app.route('/api/users/:id').get(UserController.getById);
    app.route('/api/users/:id/update').put(UserController.updateUser);
    app.route('/api/users/:id/destroy').delete(UserController.deleteUser);
    app.route('/token').post(TokenRoutes.auth);
  }
}

export default new Routes();
