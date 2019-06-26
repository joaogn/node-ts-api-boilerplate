import { Request, Response } from 'express';
import * as _ from 'lodash';
import User from '../user/service';
import Handlers from '../../api/resposeHandlers';
import * as bcrypt from 'bcrypt';

// class responsible for receiving the credentials and verify that they are valid, and authorize the use of the API

class TokenRoutes {
  public auth (req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
      User.getbyEmail(credentials.email)
        .then(user => {
          const isMatch = bcrypt.compareSync(credentials.password, user.password);

          if (isMatch) {
            Handlers.authSuccess(res, user);
          } else {
            Handlers.authFail(req, res);
          }
        })
        .catch(
          _.partial(Handlers.authFail, req, res)
        );
    }
  }
}

export default new TokenRoutes();
