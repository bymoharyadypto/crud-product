'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt-helpers')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstname cannot be empty'
        },
        notEmpty: {
          msg: 'firstname cannot be empty string'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastname cannot be empty'
        },
        notEmpty: {
          msg: 'lastname cannot be empty string'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        notNull: {
          msg: 'mail cannot be empty'
        },
        notEmpty: {
          msg: 'mail cannot be empty string'
        },
        isEmail: {
          msg: 'invalid format mail'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be empty'
        },
        notEmpty: {
          msg: 'password cannot be empty string'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashingPassword(instance.password)
      }
    }
  });
  return User;
};