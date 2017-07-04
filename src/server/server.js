import express from 'express';
import compression from 'compression';

import apiRouter from 'src/server/api/router';
import serverSideRendering from 'src/server/rendering/serverSideRendering';
import sequelize from 'src/server/sequelize';

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to database.', err));

const server = express();

// gzip compression
server.use(compression());

// serving static files
server.use('/', express.static('./dist/client'));

// API router, for serving the API
server.use('/api/v1', apiRouter);

// Choose appropriate rendering based on your
// use case
server.use('*', serverSideRendering);

server.listen(process.env.PORT || 3001);
