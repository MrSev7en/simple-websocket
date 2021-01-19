import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import server from './events/server';

import index from './pages/index/index';

export class Express {
  constructor() {
    dotenv.config();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use('', index);
  }

  async listen() {
    server.listen(process.env.PORT, '0.0.0.0', async () => {
      console.log(
        `[Express] Initialized with success (0.0.0.0:${process.env.PORT})`
      );
    });
  }
}
