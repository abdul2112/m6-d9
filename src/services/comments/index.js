import express from 'express';
import models from '../../db/index.js';
const Comment = models.Comment;
const Author = models.Author;
const Blog = models.Blog;

const commentsRouter = express.Router();

commentsRouter
  .route('/')
  .post(async (req, res, next) => {
    try {
      const data = await Comment.create(req.body);
      console.log(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .get(async (req, res, next) => {
    try {
      const data = await Comment.findAll({
        order: [['id', 'ASC']],
        include: [Author, Blog],
      });
      res.send(data);
      console.log(req.body);
    } catch (e) {
      console.log(e);
    }
  });

commentsRouter
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const data = await Comment.findByPk(req.params.id, {
        include: [Author, Blog],
      });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Comment.update(req.body, {
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
      const row = await Comment.destroy({ where: { id: req.params.id } });
      if (row > 0) {
        res.send('Comment has been DELETED');
      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {
      console.log(e);
    }
  });
export default commentsRouter;
