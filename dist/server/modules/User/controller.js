"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    ;
    UserController.prototype.getAll = function (req, res) {
        service_1.default
            .getAll()
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error get all users'));
    };
    UserController.prototype.createUser = function (req, res) {
        service_1.default
            .create(req.body)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error create new user'));
    };
    UserController.prototype.getById = function (req, res) {
        service_1.default
            .getById(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error user not find'));
    };
    UserController.prototype.updateUser = function (req, res) {
        service_1.default
            .update(parseInt(req.params.id), req.body)
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error update user'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        service_1.default
            .delete(parseInt(req.params.id))
            .then(_.partial(handlers_1.default.onSucess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error delete user'));
    };
    return UserController;
}());
exports.default = UserController;
