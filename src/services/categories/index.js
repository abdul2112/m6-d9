import express from 'express';
import models from '../../db/index.js';
const Category = models.Category;

const categoriesRouter = express.Router();

categoriesRouter
  .route('/')
  .post(async (req, res, next) => {
    try {
      const data = await Category.create(req.body);
      console.log(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.send(data);
      console.log(req.body);
    } catch (e) {
      console.log(e);
    }
  });

categoriesRouter
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const data = await Category.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Category.update(req.body, {
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
      const row = await Category.destroy({ where: { id: req.params.id } });
      if (row > 0) {
        res.send('Category has been DELETED');
      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {
      console.log(e);
    }
  });
export default categoriesRouter;
