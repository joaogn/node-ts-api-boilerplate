"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Unit test controller', function () {
    'use strict';
    var confing = require('../../server/config/env/config')();
    var model = require('../../server/models');
    var id;
    var userTest = {
        id: 100,
        name: 'Test User',
        email: 'test@email.com',
        password: 'test'
    };
    var userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };
    before(function (done) {
        model.sequelize.sync().then(function () {
            model.User.destroy({
                where: {}
            })
                .then(function () {
                return model.User.create(userDefault);
            })
                .then(function (user) {
                model.User.create(userTest)
                    .then(function () {
                    done();
                });
            });
        });
    });
    describe('Method Create', function () {
        it('Create new user', function () {
            var newUser = {
                id: 3,
                name: 'New User',
                email: 'newuser@email.com',
                password: '1234'
            };
            return service_1.default.create(newUser)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['id', 'name', 'email', 'password', 'createdAt', 'updatedAt']);
            });
        });
    });
    describe('Method Update', function () {
        it('Update user', function () {
            var userUpdate = {
                name: 'new Name',
                email: 'new@email.com'
            };
            return service_1.default.update(3, userUpdate).then(function (data) {
                console.log(data[0]);
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Method Get Users', function () {
        it('Return all users', function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys(['id', 'name', 'email', 'password']);
            });
        });
    });
    describe('Method getById', function () {
        it('Return id user', function () {
            return service_1.default.getById(3).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['id', 'name', 'email', 'password']);
            });
        });
    });
    describe('Method getByEmail', function () {
        it('Return id user', function () {
            return service_1.default.getbyEmail('new@email.com').then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['id', 'name', 'email', 'password']);
            });
        });
    });
    describe('Method Delete', function () {
        it('Delete user', function () {
            return service_1.default.delete(3).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
