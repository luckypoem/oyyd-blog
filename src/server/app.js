import fs from 'fs';

import express from 'express';
import http from 'http';
import https from 'https';

import applyStatic from './applyStatic';
import router from './router';

// TODO: make these into config file
const domain = 'blog.oyyd.net';
const devPort = 8080;
const proPort = 443;
const app = express();

let port = null;

async function main() {
  // serve static files
  await applyStatic(app);

  // page router
  app.use('/', router);

  let server = null;

  if (process.argv[2] === 'dev') {
    port = devPort;
    server = http.createServer(app);
  } else {
    const proxyUpgradeServer = express();
    proxyUpgradeServer.use('/', (req, res) => {
      res.redirect(301, `https://${domain}`);
    });
    proxyUpgradeServer.listen(80);

    const options = {
      cert: fs.readFileSync(`/etc/ssl/certs/${domain}.crt`),
      key: fs.readFileSync(`/etc/ssl/private/${domain}.key`),
      ca: fs.readFileSync('/etc/ssl/certs/starfield.pem'),
    };
    port = proPort;
    server = https.createServer(options, app);
  }

  server.listen(port);

  console.log(`server running on ${port}`); // eslint-disable-line
}

main().catch((err) => {
  setTimeout(() => {
    throw err;
  });
});
