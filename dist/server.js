const express = require('express');

const server = express();
server.use('/', express.static('./'));
server.get('/*', (req, res) => res.sendFile(`${__dirname}/index.html`));
server.listen(process.env.PORT || 3000);
