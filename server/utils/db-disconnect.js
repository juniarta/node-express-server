import MongoDB from 'mongoose';
import { logMessages } from '../../config';

export default () =>
  MongoDB.disconnect()
    .then(() => logMessages.database.disconnection)
    .catch(err => err);
