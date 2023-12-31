import express from 'express';
import cors from 'cors';
import '#src/config/index';
import conn from '#src/database/index';
import '#src/config/firebase';
import TestsController from '#src/controllers/tests.controller';
import DataController from '#src/controllers/data.controller';
import CartsController from '#src/controllers/carts.controller';
import ImagesController from '#src/controllers/images.controller';
import OrdersController from '#src/controllers/orders.controller';
import AddressesController from '#src/controllers/addresses.controller';
import PreferencesController from '#src/controllers/preferences.controller';
import FavoriteProductsController from '#src/controllers/favoriteProducts.controller';

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
console.log(process.env.PORT);
app.set('port', process.env.PORT || 3000);

/**
 * Set the routes
 */
app.use(`/${process.env.PREFIX}/tests`, TestsController);
app.use(`/${process.env.PREFIX}/data`, DataController);
app.use(`/${process.env.PREFIX}/carts`, CartsController);
app.use(`/${process.env.PREFIX}/images`, ImagesController);
app.use(`/${process.env.PREFIX}/orders`, OrdersController);
app.use(`/${process.env.PREFIX}/client/addresses`, AddressesController);
app.use(`/${process.env.PREFIX}/client/preferences`, PreferencesController);
app.use(
  `/${process.env.PREFIX}/client/favorite-products`,
  FavoriteProductsController
);

/**
 * Start the app listening on the port specified in the .env file
 */
app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}`)
);
