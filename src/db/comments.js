const CommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Comment;
};
export default CommentModel;
