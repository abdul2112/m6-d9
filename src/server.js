import express from 'express';
import listEndpoints from 'express-list-endpoints';
import blogsRouter from './services/blogs/index.js';
import authorsRouter from './services/authors/index.js';
import categoriesRouter from './services/categories/index.js';
import commentsRouter from './services/comments/index.js';
import db from './db/index.js';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from './errorHandlers.js';

const app = express();

const port = process.env.PORT || 5000;

// ******** MIDDLEWARES ************

app.use(express.json());

// ******** ROUTES ************
app.use('/blogs', blogsRouter);
app.use('/authors', authorsRouter);
app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);

// ******** ERROR MIDDLEWARES ************

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

console.table(listEndpoints(app));

db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () =>
      console.log(`Connected and running on port ${port} ✅`)
    );
    app.on('error', (error) =>
      console.info(' ❌ Server is not running due to : ', error)
    );
  })
  .catch((e) => {
    console.log(e);
  });

// app.listen(port, () => {
//   console.log(`Connected and running on port ${port} ✅`);
// });

// app.on('error', (err) => console.log('server is not running ', err));
