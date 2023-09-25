import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Database Connection Established!');
});

import routes from '../server/routes/IndexRoute.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT;

app.use(process.env.URL_API + '/employee', routes.EmployeeRoute);
app.use(process.env.URL_API + '/roles', routes.RolesRoute);
app.use(process.env.URL_API + '/users', routes.UserRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

export default app;
