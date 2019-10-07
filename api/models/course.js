'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a course title'
        },
        notEmpty: {
          msg: 'Please provide a course title'
        }
      }
    },
    description: { 
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a course description'
        },
        notEmpty: {
          msg: 'Please provide a course description'
        }
      }
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsTo(models.User);
  };
  return Course;
};