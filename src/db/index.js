import s from 'sequelize';

import BlogModel from './blogs.js';
import AuthorModel from './authors.js';
import CategoryModel from './categories.js';
import CommentModel from './comments.js';

const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;

// Getting Environment Variables by pg
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

// Connecting to a database by sequelize (sequelize is connection instance)
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
});

// Testing the connection
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
test();

// `sequelize` is `connection instance` (Connecting to a database)
// `sequelize.define`s are in each functions (Student, Blogpost, Module, Author, ...)
// `sequelize.define` returns the model
const models = {
  Author: AuthorModel(sequelize, DataTypes),
  Blog: BlogModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),
  Comment: CommentModel(sequelize, DataTypes),
  sequelize: sequelize, // We need to pass the `connection instance`
};

// This is a oneToMany relationship
// One Author has many Blogs, while each Blog belongs to a single Author.
models.Author.hasMany(models.Blog);
models.Blog.belongsTo(models.Author);

// This is a oneToMany relationship
// A Category contains many Blogs, while Blogs have one Category
models.Category.hasMany(models.Blog);
models.Blog.belongsTo(models.Category);

// This is a oneToMany relationship
// A Blog has many Comments, while comments belong to a Blog.
models.Blog.hasMany(models.Comment);
models.Comment.belongsTo(models.Blog);

// This is a oneToMany relationship
// An Author can write many Comments, while comments belong to an Author.
models.Author.hasMany(models.Comment);
models.Comment.belongsTo(models.Author);

export default models;
