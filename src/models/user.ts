'use strict';

// this code is responsible for defining a database table, to be used by sequelize.
// here bcrypt is used, in order to encrypt the user's password when saving to the database.
import { Table, Model, DataType, Column, Scopes } from 'sequelize-typescript';

import bcrypt from 'bcrypt';

@Scopes({})
@Table({
  timestamps: true,
  tableName: 'Users'
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set: function (value) {
      const salt = bcrypt.genSaltSync(10);
      const encryptedPass = bcrypt.hashSync(value, salt);
      this.setDataValue('password', encryptedPass);
    }
  })
  password: string;
}
