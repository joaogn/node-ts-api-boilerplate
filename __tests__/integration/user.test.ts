import HTTPStatus from 'http-status';
import request from 'supertest';
import app from '../../src/api/api';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import { UserModel } from '../../src/models';

// integration test, tests the answers to the routes, of this module

describe('User Integration Tests', () => {
  let token;

  const userDefault = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()

  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach(async () => {
    //   await model.sequelize.sync();
    await UserModel.destroy({ truncate: true, force: true });

    const user = await UserModel.create(userDefault);
    const payload = { id: user.id };
    token = jwt.sign(payload, process.env.SECRET, {
      // tempo de expiração do token
      expiresIn: 300 // expires in 5min
    });
  });

  describe('GET /api/users/all', () => {
    it('Return all users on json', done => {
      request(app)
        .get('/api/users/all')
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          expect(res.body.payload[0].name).toBe(userDefault.name);
          expect(res.body.payload[0].email).toBe(userDefault.email);
          done(error);
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('Return all users on json', done => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          expect(res.body.payload.id).toEqual(userDefault.id);
          expect(Object.keys(res.body.payload).sort()).toEqual(['id', 'name', 'email', 'password'].sort());
          done(error);
        });
    });
  });

  describe('POST /api/users/create ', () => {
    it('Create new user', done => {
      const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };
      request(app)
        .post('/api/users/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .send(user)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          expect(res.body.payload.name).toEqual(user.name);
          expect(res.body.payload.email).toEqual(user.email);
          done(error);
        });
    });
  });

  describe('PUT /api/users/:id/update', () => {
    it('Update user', done => {
      const user = {
        name: faker.name.findName(),
        email: faker.internet.email()
      };
      request(app)
        .put(`/api/users/${userDefault.id}/update`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .send(user)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          done(error);
        });
    });
  });

  describe('DELETE /api/users/:id/destroy', () => {
    it('Delete user', done => {
      request(app)
        .delete(`/api/users/${userDefault.id}/destroy`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          done(error);
        });
    });
  });
});
