import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import request from 'supertest';
import app from '../../src/api/api';
const model = require('../../src/models');

// integration test, tests the answers to the routes, of this module

describe('User Integration Tests', () => {
  let token;

  const userTest = {
    id: 100,
    name: 'Test User',
    email: 'test@email.com',
    password: 'test'
  };

  const userDefault = {
    id: 1,
    name: 'Default User',
    email: 'default@email.com',
    password: 'default'

  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach(async () => {
    //   await model.sequelize.sync();
    await model.User.destroy({ truncate: true, force: true });

    const user = await model.User.create(userDefault);

    token = jwt.encode({ id: user.id }, process.env.SECRET);
  });

  describe('GET /api/users/all', () => {
    it('Return all users on json', done => {
      request(app)
        .get('/api/users/all')
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          //  expect(res.body.payload).toBe('array');
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
        id: 2,
        name: 'Test User',
        email: 'user@email.com',
        password: 'newuser'
      };
      request(app)
        .post('/api/users/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .send(user)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          expect(res.body.payload.id).toEqual(user.id);
          expect(res.body.payload.name).toEqual(user.name);
          expect(res.body.payload.email).toEqual(user.email);
          done(error);
        });
    });
  });

  describe('PUT /api/users/:id/update', () => {
    it('Update user', done => {
      const user = {
        nome: 'TestUpdate',
        email: 'update@email.com'
      };
      request(app)
        .put(`/api/users/${userTest.id}/update`)
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
        .delete(`/api/users/${userTest.id}/destroy`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .end((error, res) => {
          expect(res.status).toEqual(HTTPStatus.OK);
          done(error);
        });
    });
  });
});
