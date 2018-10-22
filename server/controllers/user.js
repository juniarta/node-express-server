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
      .lean()
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

    User.findOne({ email })
      .lean()
      .exec((err, user) => {
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

// TODO: implement a secure way to logout with jwt (maybe destroy user's cookie)
export const logoutCtrl = session =>
  new Promise((resolve, reject) => {
    session.destroy(err => {
      err && reject(err);
      resolve();
    });
  });

export const currentCtrl = session =>
  new Promise((resolve, reject) => {
    if (!session || !session.userId) {
      const err = new Error('Session expired');
      err.status = 440;
      reject(err);
    }
    console.log('---------------SESSION', session);

    // TODO: implement logic to take current user data
    resolve(session.userId);
  });
