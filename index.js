const express = require('express');
const dotenv = require('dotenv');
const homeRoute = require('./src/routes/homeRoute');
const userRoute = require('./src/routes/userRoute');
const authenticationRoute = require('./src/routes/authenticationRoute');
const errorHandler = require('./src/handlers/errorHandler');

dotenv.config();

const server = async () => {
  const app = express();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  app.use(express.json());

  app.use(homeRoute);
  app.use(userRoute);
  app.use(authenticationRoute);

  app.use((req, res) => {
    res.status(404).json({
      code: 404,
      message: 'URL Not found',
    });
  });

  app.use(errorHandler);

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://${host}:${port}`);
  });
};

server();
