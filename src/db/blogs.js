const BlogModel = (sequelize, DataTypes) => {
  const Blog = sequelize.define('blog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // category: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read_time_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    read_time_unit: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Blog;
};

export default BlogModel;
