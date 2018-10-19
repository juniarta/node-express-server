import { promisify } from 'util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { serverSettings } from '../../config';

const bcryptCompare = promisify(bcrypt.compare);
const bcryptHash = promisify(bcrypt.hash);

import User from '../models/user';

export const registerCtrl = ({ email, password }) =>
  new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(data => {
        if (data) {
          const err = new Error('User already exists');
          err.status = 400;
          reject(err);
        }
        bcryptHash(password, 10)
          .then(password => {
            const user = new User({
              email: email,
              password: password
            });

            user
              .save()
              .then(user => resolve(user))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      })
      .catch(err => console.log(err));
  });

export const loginCtrl = ({ email, password }) =>
  new Promise((resolve, reject) => {
    User.findOne({ email }).exec((err, user) => {
      err && reject(err);
      if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        reject(err);
      }
      bcryptCompare(password, user.password, (err, result) => {
        err && reject(err);
        if (result) {
          jwt.sign(
            { email: email },
            serverSettings.session.secret,
            {
              expiresIn: '1h'
            },
            (err, token) => {
              err && reject(err);
              if (token) {
                resolve({ user, token });
              }
            }
          );
        }
      });
    });
  });

// TODO: implement a secure way to logout with jwt (maybe destroys user's cookie)
export const logoutCtrl = session =>
  new Promise((resolve, reject) => {
    session.destroy(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
