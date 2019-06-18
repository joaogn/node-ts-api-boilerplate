import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/resposeHandlers';
import User from './service';

// the controler class is used to make the connection between the UserRouter class and the Service class
// And returns the result of the promisses of the service class methods.

class UserController {
  constructor () {};

  getAll (req: Request, res: Response) {
    User
      .getAll()
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error get all users'));
  }

  createUser (req: Request, res: Response) {
    User
      .create(req.body)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, 'Error create new user'));
  }

  getById (req: Request, res: Response) {
    User
      .getById(parseInt(req.params.id))
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error user not find'));
  }

  updateUser (req: Request, res: Response) {
    User
      .update(parseInt(req.params.id), req.body)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error update user'));
  }

  deleteUser (req: Request, res: Response) {
    User
      .delete(parseInt(req.params.id))
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error delete user'));
  }
}

export default new UserController();
