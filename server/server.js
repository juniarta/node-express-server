import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import errorHandler from 'errorhandler';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import path from 'path';

import { serverSettings, logMessages } from '../config';
import { dbConnection, dbDisconnection } from './utils';

import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const serverPort = serverSettings.port;

const sessionSettings = session({
  secret: 'test session',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 3600000 }
});

const SERVER = app.listen(serverPort, () => {
  console.clear();
  console.info(chalk.green(logMessages.server.connection), serverSettings.port);
  dbConnection()
    .then(res => console.log(chalk.green(res)))
    .catch(err => console.error(chalk.red(err)));
});

process.on('SIGINT', () => {
  SERVER.close(() => {
    dbDisconnection()
      .then(res => {
        console.clear();
        console.log(chalk.yellow(res));
      })
      .catch(err => console.error(chalk.red(err)))
      .finally(() => {
        console.log(chalk.yellow(logMessages.server.disconnection));
        process.exit(0);
      });
  });
});

!isProduction && app.use(errorHandler());
app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(sessionSettings);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/v1/', routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
