import jwt from 'jsonwebtoken';
import { serverSettings } from '../../config';

export const authVerifyCtrl = headToken =>
  new Promise((resolve, reject) => {
    let token = headToken['x-access-token'] || headToken['authorization'];

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, serverSettings.session.secret, (err, decoded) => {
        err && reject(err);
        resolve(decoded);
      });
    } else {
      const err = new Error('Auth token is not supplied');
      err.status = 401;
      reject(err);
    }
  });
