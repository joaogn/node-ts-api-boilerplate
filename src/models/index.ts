import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/user';
const config = require('../config/database');

'use strict';

// This code was created by sequelize init, it is responsible for configuring and starting the sequelize and its database.

export const sequelize = new Sequelize(config.db, config.username, config.password, config);

sequelize.addModels([UserModel]);

export { UserModel };
