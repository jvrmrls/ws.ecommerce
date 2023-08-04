import mongoose from 'mongoose';
import { MONGO_URI } from '#src/config/index';

const conn = mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Error connecting to the database');
    console.log(error);
  });

export default conn;
