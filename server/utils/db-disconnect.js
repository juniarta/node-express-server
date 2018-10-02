import MongoDB from 'mongoose';
import { logMessages } from '../../config';

export default () => {
  return new Promise((resolve, reject) => {
    try {
      MongoDB.disconnect(() => {
        resolve(logMessages.database.disconnection);
      });
    } catch (err) {
      reject(err);
    }
  });
};
