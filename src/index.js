import express from 'express';
import cors from 'cors';
import multer from 'multer';
import '#src/config/index';
import conn from '#src/database/index';
import '#src/config/firebase';
import DataController from '#src/controllers/data.controller';
import ProductsController from '#src/controllers/products.controller';
import OptionsController from '#src/controllers/options.controller';
import CategoriesController from '#src/controllers/categories.controller';
import UsersController from '#src/controllers/users.controller';
import CartsController from '#src/controllers/carts.controller';
import CarouselsController from '#src/controllers/carousels.controller';
import ImagesController from '#src/controllers/images.controller';

/**
 * App instance
 */
const app = express();

/**
 * Configuration for the app
 */
app.use(cors());
app.use(express.json());

/**
 * Connect to the database
 */
conn;

/**
 * Set the app variables
 */
app.set('port', process.env.PORT || 3000);

/**
 * Set the routes
 */
app.use(`/${process.env.PREFIX}/data`, DataController);
app.use(`/${process.env.PREFIX}/products`, ProductsController);
app.use(`/${process.env.PREFIX}/options`, OptionsController);
app.use(`/${process.env.PREFIX}/categories`, CategoriesController);
app.use(`/${process.env.PREFIX}/users`, UsersController);
app.use(`/${process.env.PREFIX}/carts`, CartsController);
app.use(`/${process.env.PREFIX}/carousels`, CarouselsController);
app.use(`/${process.env.PREFIX}/images`, ImagesController);

/**
 * Start the app listening on the port specified in the .env file
 */
app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}`)
);
