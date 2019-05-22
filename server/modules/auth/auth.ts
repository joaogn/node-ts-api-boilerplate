import { Request, Response } from 'express';
import * as _ from 'lodash';
import User from '../User/service';
import authSucess from '../../api/responses/authSucess';
import authFail from '../../api/responses/authFail';

const UserService = new User();

class TokenRoutes {

    auth(req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password') ){
            UserService.getbyEmail(credentials.email)
            .then(_.partial(authSucess, res, credentials))
            .catch(_.partial(authFail, req, res));
        }
    }

}

export default new TokenRoutes();