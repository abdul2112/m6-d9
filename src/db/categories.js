const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Category;
};
export default CategoryModel;
