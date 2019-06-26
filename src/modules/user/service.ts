import { IUser, createUser, createUsers } from './interface';
const model = require('../../models');

// The service class serves to implement our CRUDS or our Business Rules

class User implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    constructor () {}

    create (user: any) {
      return model.User.create(user);
    }

    getAll (): Promise<IUser[]> {
      return model.User.findAll({
        order: ['name']
      })
        .then(createUsers);
    }

    getById (id: number): Promise<IUser> {
      return model.User.findOne({
        where: { id }
      })
        .then(createUser);
    }

    getbyEmail (email: string): Promise<IUser> {
      return model.User.findOne({
        where: { email }
      })
        .then(createUser);
    }

    update (id: number, user: any) {
      return model.User.update(user, {
        where: { id },
        fields: ['name', 'email', 'password'],
        hooks: true,
        individualHooks: true
      });
    }

    delete (id: number) {
      return model.User.destroy({
        where: { id }
      });
    }
}

export default new User();
