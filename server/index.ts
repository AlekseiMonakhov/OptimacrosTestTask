import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import carsRouter from './src/routes/carsRouter';
import { basicAuthMiddleware } from './src/middlewares/basicAuth';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}
const mongoUri = process.env.MONGO_URI as string;

app.use(express.json());
app.use('/api/v1', basicAuthMiddleware, carsRouter);


mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

