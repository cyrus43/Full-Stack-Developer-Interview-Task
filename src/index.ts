import express, { Express } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { addReading, getReading } from './database';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post('/data', async (req, res) => {
  // TODO: parse incoming data, and save it to the database
  // data is of the form:
  //  {timestamp} {name} {value}

  // addReading(...)

  return res.json({ success: false });
});

app.get('/data', async (req, res) => {
  // TODO: check what dates have been requested, and retrieve all data within the given range

  // getReading(...)

  return res.json({ success: false });
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
