'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define(
    'Books',
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Book title is required!'
          }
        }
      },
      author: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Author name is required!'
          }
        }
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER
    },
    {}
  );
  return Books;
};
