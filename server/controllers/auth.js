import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sessionSettings } from '../../config';
import User from '../models/user';

export const validateTokenCtr = authorization =>
  new Promise((resolve, reject) => {
    if (authorization) {
      const token = authorization.split(' ')[1];
      const options = {
        expiresIn: '1h'
      };

      jwt.verify(token, sessionSettings.secret, options, (err, decoded) => {
        err && reject(err);
        resolve(decoded);
      });
    }

    const err = new Error('Auth token not supplied');
    err.status = 401;
    reject(err);
  });

export const loginCtrl = ({ email, password }) =>
  new Promise((resolve, reject) => {
    let err;

    if (!email) {
      err = new Error('Email is required');
      err.status = 422;
      reject(err);
    }

    if (!password) {
      err = new Error('Password is required');
      err.status = 422;
      reject(err);
    }

    User.findOne({ email }).exec((err, user) => {
      err && reject(err);
      if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        reject(err);
      }

      bcrypt
        .compare(password, user.password)
        .then(res => {
          if (res) {
            const payload = { email };
            const options = { expiresIn: '1h' };
            const secret = sessionSettings.secret;

            jwt.sign(payload, secret, options, (err, token) => {
              (err || !token) && reject(err);
              token && resolve({ user, token });

              const tokenErr = new Error('Errore generazione del token');
              tokenErr.status = 500;
              reject(tokenErr);
            });
          }
        })
        .catch(err => reject(err));
    });
  });

// TODO: implement a secure way to logout with jwt (maybe destroy user's cookie)
export const logoutCtrl = session =>
  new Promise((resolve, reject) => {
    session.destroy(err => {
      err && reject(err);
      resolve();
    });
  });
