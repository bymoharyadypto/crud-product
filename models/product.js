'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    kode_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'kode produk cannot be empty'
        },
        notEmpty:{
          msg: 'kode produk cannot be empty string'
        }
      }
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'nama produk cannot be empty'
        },
        notEmpty:{
          msg: 'nama produk cannot be empty string'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'qty produk cannot be empty'
        },
        notEmpty:{
          msg: 'qty produk cannot be empty string'
        }
      }
    },
    image_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'image produk cannot be empty'
        },
        notEmpty:{
          msg: 'image produk cannot be empty string'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};