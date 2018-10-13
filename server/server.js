import http from 'http';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import { serverSettings, logMessages } from '../config';
import { dbConnection, dbDisconnection } from './utils';

import routes from './routes';

const app = express();
const server = http.createServer(app)
const serverPort = serverSettings.port;

app.use(cors());
app.options('*', cors());

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use(routes);

app.use(
  session({
    secret: 'test session',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

app.get('/check', function(req, res) {
  res.json({
    TEST: 'Welcome to the Node express JWT Tutorial'
  });
});

dbConnection()
  .then(res => {
    console.log(res);
    server.listen(serverPort, () => {
      console.log(logMessages.server.connection, server.address().address, server.address().port);
      process.send('ready');
    });
  })
  .catch(err => console.error(err));

process.on('SIGINT', () => {
  server.close(function(err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    dbDisconnection()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err))
      .finally(() => {
        console.log(logMessages.server.disconnection);
        process.exit(0);
      });
  });
});
