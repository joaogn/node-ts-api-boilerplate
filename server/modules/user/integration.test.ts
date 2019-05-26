import * as jwt from 'jwt-simple'; 
import * as HTTPStatus from 'http-status';
import {app, request, expect} from '../../config/test/helpers';

const config = require('../../config/env/config')();
const model = require('../../models');

//integration test, tests the answers to the routes, of this module

describe('User Integration Tests', ()=> {


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

    //before each test is checked the database synchronization, 
    //the whole database is erased, and a known user is created to maintain good practices
    beforeEach((done) => {
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