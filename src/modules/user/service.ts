import { IUser, createUser, createUsers } from './interface';
const model = require('../../models');

// The service class serves to implement our CRUDS or our Business Rules

class User implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    public create (user: any) {
      return model.User.create(user);
    }

    public getAll (): Promise<IUser[]> {
      return model.User.findAll({
        order: ['name']
      })
        .then(createUsers);
    }

    public getById (id: number): Promise<IUser> {
      return model.User.findOne({
        where: { id }
      })
        .then(createUser);
    }

    public getbyEmail (email: string): Promise<IUser> {
      return model.User.findOne({
        where: { email }
      })
        .then(createUser);
    }

    public update (id: number, user: any) {
      return model.User.update(user, {
        where: { id },
        fields: ['name', 'email', 'password'],
        hooks: true,
        individualHooks: true
      });
    }

    public delete (id: number) {
      return model.User.destroy({
        where: { id }
      });
    }
}

export default new User();
