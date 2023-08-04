import express from 'express';
import cors from 'cors';
import '#src/config/index';
import conn from '#src/database/index';
import DataController from '#src/controllers/data.controller';
import mongoose from 'mongoose';
import { MONGO_URI } from '#src/config/index';

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

/**
 * Start the app listening on the port specified in the .env file
 */
app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}`)
);
