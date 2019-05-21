import { Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import {onError} from '../../api/responses/errorHandler';
import {onSucess} from '../../api/responses/sucessHandler';
import User from './service';
import { dbErrorHandler } from '../../config/dbErrorHandler';



class UserController {

    private UserService: User;

    constructor(){
        this.UserService = new User;
    };

    getAll(req: Request, res: Response){

        this.UserService
        .getAll()
        .then(_.partial(onSucess, res))
        .catch(_.partial(onError, res, 'Error get all users'));



    }

    createUser(req: Request, res: Response){

        this.UserService
        .create(req.body)
        .then(_.partial(onSucess, res))
        .catch(_.partial(dbErrorHandler, res))
        .catch(_.partial(onError, res, 'Error create new user'));

    }

    getById(req: Request, res: Response){

        
        this.UserService
        .getById(parseInt(req.params.id))
        .then(_.partial(onSucess, res))
        .catch(_.partial(onError, res, 'Error user not find'));
  

    }

    updateUser(req: Request, res: Response){

        this.UserService
        .update(parseInt(req.params.id),req.body)
        .then(_.partial(onSucess, res))
        .catch(_.partial(onError, res, 'Error update user'));
    }

    deleteUser(req: Request, res: Response){

        this.UserService
        .delete(parseInt(req.params.id))
        .then(_.partial(onSucess, res))
        .catch(_.partial(onError, res, 'Error delete user'));

    }


}

export default UserController;