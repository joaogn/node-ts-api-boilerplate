import * as jwt from 'jwt-simple'; 
import * as HTTPStatus from 'http-status';
import {app, request, expect} from './config/helpers';


describe('Integration Tests', ()=> {

    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;
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

    }

    before((done) => {
        model.sequelize.sync().then(() => {

            model.User.destroy({
                where: {}
            })
            .then(() => {
                return model.User.create(userDefault);
            })
            .then(user => {
                model.User.create(userTest)
                    .then(() => {
                        token = jwt.encode({id: user.id}, config.secret)
                        done();
                    })
            })
        })

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
    })

    describe('GET /api/users/all', ()=>{
        it('Return all users on json', done =>{
            request(app)
                .get('/api/users/all')
                .set('Content-Type','application/json')
                .set('Authorization',  `JWT ${token}`)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                })
        });
    });

    describe('GET /api/users/:id', ()=>{
        it('Return all users on json', done =>{ 
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type','application/json')
                .set('Authorization',  `JWT ${token}`)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id);
                    expect(res.body.payload).to.have.all.keys(['id','name','email','password']);
                    id = res.body.payload.id;
                    done(error);
                })
        });
    });

    describe('POST /api/users/create ', ()=>{
        it('Create new user',done =>{
            const user = {
                id: 2,    
                name: 'Test User',
                email: 'user@email.com',
                password: 'newuser'
            }
            request(app)
                .post('/api/users/create')
                .set('Content-Type','application/json')
                .set('Authorization',  `JWT ${token}`)
                .send(user)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(user.id);
                    expect(res.body.payload.name).to.eql(user.name);
                    expect(res.body.payload.email).to.eql(user.email);
                    done(error);
            })

        });
    });

    describe('PUT /api/users/:id/update', ()=>{
        it('Update user', done =>{
            const user = { 
                nome: 'TestUpdate',
                email: 'update@email.com'
            }
            request(app)
                .put(`/api/users/${userTest.id}/update`)
                .set('Content-Type','application/json')
                .set('Authorization',  `JWT ${token}`)
                .send(user)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
            })

        });
    });

    describe('DELETE /api/users/:id/destroy', ()=>{
        it('Delete user', done =>{
            request(app)
            .delete(`/api/users/${userTest.id}/destroy`)
            .set('Content-Type','application/json')
            .set('Authorization',  `JWT ${token}`)
            .end((error,res) =>  {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })

        });
    });

});