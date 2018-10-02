import MongoDB from 'mongoose';

import { dbSettings, logMessages } from '../../config';

const { user, pass, host } = dbSettings;
const connUrl = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true`;
const connSettings = {
  useNewUrlParser: true
};

export default () => {
  return new Promise((resolve, reject) => {
    MongoDB.connect(
      connUrl,
      connSettings
    )
      .then(() => {
        resolve(logMessages.database.connection);
      })
      .catch(err => {
        reject(err);
      });
  });
};
