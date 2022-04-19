'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyApplication.belongsTo(models.User)
      MyApplication.belongsTo(models.Source)
    }
  }
  MyApplication.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job ID is required'
        },
        notEmpty: {
          msg: 'Job ID is required'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title job is required'
        },
        notEmpty: {
          msg: 'Title job is required'
        }
      }
    },
    remote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status remote is required'
        },
        notEmpty: {
          msg: 'Status remote is required'
        }
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Company name is required'
        },
        notEmpty: {
          msg: 'Company name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description job is required'
        },
        notEmpty: {
          msg: 'Description job is required'
        }
      }
    },
    SourceId: DataTypes.INTEGER,
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date created job is required'
        },
        notEmpty: {
          msg: 'Date created job is required'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.status = 'not applied'
      }
    },
    sequelize,
    modelName: 'MyApplication',
  });
  return MyApplication;
};