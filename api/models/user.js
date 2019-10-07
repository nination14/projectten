'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a first name'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a last name'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'A user already exists with that email address'
      },
      validate: {
        notNull: {
          msg: 'Please provide an email address'
        },
        notEmpty: {
          msg: 'Please provide an email address'
        },
        isEmail: {
          msg: 'Email address must be formatted correctly' 
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a password'
        },
        notEmpty: {
          msg: 'Please provide a password'
        }
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Course);
  };
  return User;
};