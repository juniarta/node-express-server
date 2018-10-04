import { promisify } from 'util';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const bcryptCompare = promisify(bcrypt.compare);
const bcryptHash = promisify(bcrypt.hash);

import User from '../../models/user';

export const signupCtrl = ({ email, password }) =>
  bcryptHash(password, 10).then(hash => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hash
    });

    return user.save().then(() => ({ user }));
  });

export const signinCtrl = ({ email, password }) =>
  User.findOne({ email })
    .exec()
    .then(user =>
      bcryptCompare(password, user.password).then(result => {
        if (result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
              _id: user._id
            },
            'secret',
            {
              expiresIn: '2h'
            }
          );

          return { user, token: JWTToken };
        }

        throw new Error('test custom error');
      })
    );
