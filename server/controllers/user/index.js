import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from '../../models/user';

export const signupCtrl = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, async function(err, hash) {
      if (err) {
        reject(err);
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: email,
          password: hash
        });

        try {
          await user.save();
          resolve({ user });
        } catch (err) {
          reject(err)
        }
      }
    });
  });
};

export const signinCtrl = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .exec()
      .then(function(user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            reject(err);
          }
          if (result) {
            const JWTToken = jwt.sign({
                email: user.email,
                _id: user._id
              },
              'secret', {
                expiresIn: '2h'
              }
            );
            resolve({ user, token: JWTToken });
          }
          reject(new Error('test custom error'));
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
