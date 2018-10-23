import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { serverSettings } from '../../config';

import User from '../models/user';

export const registerCtrl = ({
  email,
  password,
  firstName,
  lastName,
  userName
}) =>
  new Promise((resolve, reject) => {
    User.findOne({ email })

      .then(data => {
        if (data) {
          const err = new Error('User already exists');
          err.status = 400;
          reject(err);
        }
        bcrypt
          .hash(password, 10)
          .then(password => {
            const user = new User({
              email,
              password,
              firstName,
              lastName,
              userName
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
            jwt.sign(
              { email },
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

export const currentCtrl = () =>
  new Promise((resolve, reject) => {
    reject();
  });
