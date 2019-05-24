
import {testDouble, expect} from '../../config/test/helpers';
import User from './service'
const model = require('../../models');



describe('Unit test controller', ()=> {

    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'

    }

    beforeEach((done) => {
        model.sequelize.sync().then(() => {
            model.User.destroy({
                where:{}
            })
            .then(() => {
                model.User.create(userDefault).then(() => {
                    console.log('Default User Created');
                    done();
                })
            })
        })    

    });;

    describe('Method Create', ()=>{
        
           
            it('Create new user',()=>{
                const newUser = {
                    id: 2,
                    name: 'New User',
                    email: 'newuser@email.com',
                    password: '1234'
                };
 
                return User.create(newUser)
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

            return User.update(userDefault.id,userUpdate).then(data => {
                console.log(data[0]);
                expect(data[0]).to.be.equal(1);
            })

        });
    });


    describe('Method Get Users', ()=>{
        it('Return all users',()=>{
            return User.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(['id','name','email','password']);
            })
        });
    });

    describe('Method getById', ()=>{
        it('Return id user',()=>{
            return User.getById(userDefault.id).then(data => {
                expect(data).to.have.all.keys(['id','name','email','password']);
            })
        });
    });

    describe('Method getByEmail', ()=>{
        it('Return id user',()=>{
            return User.getbyEmail(userDefault.email).then(data => {
                expect(data).to.have.all.keys(['id','name','email','password']);
            })
        });
    });


    describe('Method Delete', ()=>{
        it('Delete user',()=>{

            return User.delete(userDefault.id).then(data => {
                expect(data).to.be.equal(1);
            });

        });
    });



});

