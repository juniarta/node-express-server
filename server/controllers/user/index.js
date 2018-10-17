import { promisify } from 'util';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const bcryptCompare = promisify(bcrypt.compare);
const bcryptHash = promisify(bcrypt.hash);

import User from '../../models/user';

export const registerCtrl = ({ email, password }) =>
  bcryptHash(password, 10).then(hash => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hash
    });

    return user
      .save()
      .then(() => ({ user }))
      .catch(err => err);
  });

export const loginCtrl = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        reject(err || 'Incorrect login');
        return;
      }
      bcryptCompare(password, user.password)
        .then(result => {
          if (result) {
            const JWTToken = jwt.sign(
              {
                _id: user._id,
                email: user.email
              },
              'secret',
              {
                expiresIn: '1h'
              }
            );
            resolve({ user, token: JWTToken });
          }
          reject('Incorrect login');
        })
        .catch(err => reject(err));
    });
  });
};

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
