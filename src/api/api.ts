'use strict';

import express from 'express';

import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import Handlers from './resposeHandlers';
import Auth from '../auth';

// class responsible for setting up and starting routes the API

class Api {
    public express: express.Application;

    constructor () {
      this.express = express();
      this.middleware();
    }

    middleware (): void{
      this.express.use(morgan('dev'));
      this.express.use(bodyParser.urlencoded({ extended: true }));
      this.express.use(bodyParser.json());
      this.express.use(Handlers.errorHandlerApi);
      this.express.use(Auth.config().initialize());
      this.router(this.express, Auth);
    }

    private router (app: express.Application, auth: any): void{
      Routes.initRoutes(app, auth);
    }
}

export default new Api().express;
