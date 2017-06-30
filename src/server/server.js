import express from 'express';
import compression from 'compression';

import api from './api';

const server = express();
server.use(compression());
server.use('/', express.static('./dist/client'));
server.use('/api/v1', api);
server.listen(process.env.PORT || 3001);
