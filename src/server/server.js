import express from 'express';
import compression from 'compression';

import apiRouter from './api/router';
import serverSideRendering from './rendering/serverSideRendering';

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
