import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from '../../config/test/helpers';
import { describe, beforeEach, it } from 'mocha';

const config = require('../../config/env/config')();
const model = require('../../models');

// integration test, tests the answers to the routes, of this module

describe('Auth Integration Tests', () => {
  let token;

  const userDefault = {
    id: 1,
    name: 'Default User',
    email: 'default@email.com',
    password: 'default'

  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach((done) => {
    model.sequelize.sync().then(() => {
      model.User.destroy({
        where: {}
      })
        .then(() => {
          return model.User.create(userDefault);
        })
        .then(user => {
          token = jwt.encode({ id: user.id }, config.secret);
          done();
        });
    });
  });

  describe('POST /token', () => {
    it('get JWT Token', done => {
      const credentials = {
        email: userDefault.email,
        password: userDefault.password
      };
      request(app)
        .post('/token')
        .send(credentials)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.token).to.equal(`${token}`);
          done(error);
        });
    });

    it(' Get notvalid token', done => {
      const credentials = {
        email: 'notvalid@email.com',
        password: '1234'
      };
      request(app)
        .post('/token')
        .send(credentials)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
          expect(res.body).to.empty;
          done(error);
        });
    });
  });
});
