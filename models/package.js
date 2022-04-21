"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Package.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: "PackageId",
      });
    }
  }
  Package.init(
    {
      destinationName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Destination name is required",
          },
        },
      },
      destinationCountry: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Destination country is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package pricing is required",
          },
        },
      },
      imageThumbnail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package Image Thumbnail is required",
          },
        },
      },
      imageUrls: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package Image URLs is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package description is required",
          },
        },
      },
      departureDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package departure date is required",
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package rating is required",
          },
        },
      },
      reviewers: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package number of reviewers is required",
          },
        },
      },
      isPromo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Package promotion status is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
