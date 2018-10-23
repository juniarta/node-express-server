import MongoDB from 'mongoose';

import { dbSettings, logMessages } from '../../config';

const { user, pass, host } = dbSettings;
const connUrl = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true`;
const connSettings = {
  useNewUrlParser: true,
  useCreateIndex: true
};

export default () =>
  MongoDB.connect(
    connUrl,
    connSettings
  )
    .then(() => logMessages.database.connection)
    .catch(err => err);
