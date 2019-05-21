
import {testDouble, expect} from './config/helpers';
import User from '../../server/modules/User/service'



describe('Unit test controller', ()=> {
    'use strict';

    const confing = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;

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
                        done();
                    })
            })

        })

    });

    describe('Method Create', ()=>{
        
           
            it('Create new user',()=>{
                const newUser = {
                    id: 3,
                    name: 'New User',
                    email: 'newuser@email.com',
                    password: '1234'
                };
                const user = new User();
                return user.create(newUser)
                      .then(data => {
                            expect(data.dataValues).to.have.all.keys(['id','name','email','password','createdAt','updatedAt']);
                        });
                        
            });
    });


    describe('Method Update', ()=>{
        it('Update user',()=>{
            const userUpdate = {
                name: 'new Name',
                email: 'new@email.com'
            };
            const user = new User();
            return user.update(3,userUpdate).then(data => {
                console.log(data[0]);
                expect(data[0]).to.be.equal(1);
            })

        });
    });


    describe('Method Get Users', ()=>{
        it('Return all users',()=>{
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(['id','name','email','password']);
            })
        });
    });

    describe('Method getById', ()=>{
        it('Return id user',()=>{
            const user = new User();
            return user.getById(3).then(data => {
                expect(data).to.have.all.keys(['id','name','email','password']);
            })
        });
    });

    describe('Method getByEmail', ()=>{
        it('Return id user',()=>{
            const user = new User();
            return user.getbyEmail('new@email.com').then(data => {
                expect(data).to.have.all.keys(['id','name','email','password']);
            })
        });
    });


    describe('Method Delete', ()=>{
        it('Delete user',()=>{

            const user = new User();
            return user.delete(3).then(data => {
                expect(data).to.be.equal(1);
            });

        });
    });



});

