'use strict';

import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken';

// Class that has the methods responsible for the API response

class Handlers {
  public authFail (req: Request, res: Response) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  }

  public authSuccess (res: Response, data: any) {
    const payload = { id: data.id };
    res.json({
      token: jwt.sign(payload, process.env.SECRET, {
        // tempo de expiração do token
        expiresIn: 300 // expires in 5min
      })
    });
  }

  public onError (res: Response, message: string, err: any) {
    console.log(`Error: ${err}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }

  public onSucess (res: Response, data: any) {
    res.status(HttpStatus.OK).json({ payload: data });
  }

  public errorHandlerApi (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(`API error handler execute: ${err}`);
    res.status(500).json({
      errorCode: 'ERR-001',
      message: 'Internal Server Error'
    });
  }
}

export default new Handlers();
