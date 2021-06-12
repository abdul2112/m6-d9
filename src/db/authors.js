export default (sequelize, DataTypes) => {
  const AuthorModel = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return AuthorModel;
};
