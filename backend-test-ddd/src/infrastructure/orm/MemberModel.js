const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const MemberModel = sequelize.define('members', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  penalty_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  book_borrowed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = MemberModel;