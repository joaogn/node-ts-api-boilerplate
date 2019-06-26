// import * as jwt from 'jwt-simple';
import jwt from 'jsonwebtoken';
import * as HTTPStatus from 'http-status';
import request from 'supertest';
import app from '../../src/api/api';

const model = require('../../src/models');

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
  beforeEach(async () => {
    await model.User.destroy({ truncate: true, force: true });

    const user = await model.User.create(userDefault);

  //  token = jwt.encode({ id: user.id }, process.env.SECRET);
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
          expect(res.status).toEqual(HTTPStatus.OK);
          const decoded:any = jwt.verify(res.body.token, process.env.SECRET);
          expect(decoded.id).toEqual(userDefault.id);
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
          expect(res.status).toEqual(HTTPStatus.UNAUTHORIZED);
          expect(res.body).toEqual({});
          done(error);
        });
    });
  });
});
