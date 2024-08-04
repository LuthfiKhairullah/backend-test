const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const RecordModel = sequelize.define('records', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  member_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  book_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  borrow_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = RecordModel;