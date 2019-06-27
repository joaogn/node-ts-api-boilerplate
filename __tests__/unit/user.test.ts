
import User from '../../src/modules/user/service';
import faker from 'faker';
const model = require('../../src/models');

// unit test, used to test the functions exposed by the module service

describe('Unit test controller', () => {
  const userDefault = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach(async () => {
    await model.User.destroy({ truncate: true, force: true });

    await model.User.create(userDefault);
  });

  describe('Method Create', () => {
    it('Create new user', () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      return User.create(newUser)
        .then(data => {
          expect(Object.keys(data.dataValues).sort()).toEqual(['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'].sort());
        });
    });
  });

  describe('Method Update', () => {
    it('Update user', () => {
      const userUpdate = {
        name: faker.name.findName(),
        email: faker.internet.email()
      };

      return User.update(userDefault.id, userUpdate).then(data => {
        console.log(data[0]);
        expect(data[0]).toEqual(1);
      });
    });
  });

  describe('Method Get Users', () => {
    it('Return all users', () => {
      return User.getAll().then(data => {
        //   expect(data).toBe('array');
        expect(Object.keys(data[0]).sort()).toEqual(['id', 'name', 'email', 'password'].sort());
      });
    });
  });

  describe('Method getById', () => {
    it('Return id user', () => {
      return User.getById(userDefault.id).then(data => {
        expect(Object.keys(data).sort()).toEqual(['id', 'name', 'email', 'password'].sort());
      });
    });
  });

  describe('Method getByEmail', () => {
    it('Return id user', () => {
      return User.getbyEmail(userDefault.email).then(data => {
        expect(Object.keys(data).sort()).toEqual(['id', 'name', 'email', 'password'].sort());
      });
    });
  });

  describe('Method Delete', () => {
    it('Delete user', () => {
      return User.delete(userDefault.id).then(data => {
        expect(data).toBe(1);
      });
    });
  });
});
