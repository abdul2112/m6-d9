import express from 'express';
import models from '../../db/index.js';
const Author = models.Author;
const authorsRouter = express.Router();

authorsRouter
  .route('/')
  .post(async (req, res, next) => {
    try {
      const data = await Author.create(req.body);
      console.log(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .get(async (req, res, next) => {
    try {
      const data = await Author.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  });

authorsRouter
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const data = await Author.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Author.update(req.body, {
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
      const row = await Author.destroy({ where: { id: req.params.id } });
      if (row > 0) {
        res.send('Author has been DELETED');
      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {
      console.log(e);
    }
  });

export default authorsRouter;
