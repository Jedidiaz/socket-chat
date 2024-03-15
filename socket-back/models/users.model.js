const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const User = connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_socket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { updatedAt: false }
);

module.exports = User;
