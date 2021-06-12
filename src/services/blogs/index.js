import express from 'express';
import models from '../../db/index.js';
const Blog = models.Blog;
const Author = models.Author;
const Comment = models.Comment;

const blogsRouter = express.Router();

blogsRouter
  .route('/')
  .post(async (req, res, next) => {
    try {
      const data = await Blog.create(req.body);
      console.log(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .get(async (req, res, next) => {
    try {
      const data = await Blog.findAll({
        order: [['id', 'ASC']],
        include: [Author, { model: Comment, include: Author }],
      });
      res.send(data);
      console.log(req.body);
    } catch (e) {
      console.log(e);
    }
  });

blogsRouter
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const data = await Blog.findByPk(req.params.id, {
        include: [Author, { model: Comment, include: Author }],
      });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Blog.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const row = await Blog.destroy({ where: { id: req.params.id } });
      if (row > 0) {
        res.send('Blog has been DELETED');
      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {
      console.log(e);
    }
  });
export default blogsRouter;
