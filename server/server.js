import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

import { serverSettings, logMessages, winstonSettings } from '../config';
import { dbConnection, dbDisconnection } from './utils';

import routes from './routes';

const app = express();
const serverPort = serverSettings.port;
const isProd = process.env.NODE_ENV === 'production';

const sessionSettings = session({
  secret: 'test session',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 3600000 }
});

const SERVER = app.listen(serverPort, () => {
  console.info(logMessages.server.connection, serverSettings.port);
  dbConnection()
    .then(res => console.log(res))
    .catch(err => console.error(err));
});

process.on('SIGINT', () => {
  SERVER.close(() => {
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

process.on('uncaughtException', er => {
  console.error(er.stack);
  process.exit(1);
});

app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(sessionSettings);
app.use(morgan('combined', { stream: winstonSettings.stream }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/v1/', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use((err, req, res, next) => {
  winstonSettings.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: isProd ? {} : err
    }
  });

  next(err);
});
