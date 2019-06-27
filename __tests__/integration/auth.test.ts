import jwt from 'jsonwebtoken';
import HTTPStatus from 'http-status';
import request from 'supertest';
import app from '../../src/api/api';
import faker from 'faker';

const model = require('../../src/models');

// integration test, tests the answers to the routes, of this module

describe('Auth Integration Tests', () => {
  const userDefault = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()

  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach(async () => {
    await model.User.destroy({ truncate: true, force: true });

    await model.User.create(userDefault);
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
        email: faker.internet.email(),
        password: faker.internet.password()
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
