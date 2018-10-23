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

        const user = new User({
          email,
          password
        });

        user
          .save()
          .then(user => resolve(user))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

export const allCtrl = payload =>
  new Promise((resolve, reject) => {
    // TODO: refactor for user.role
    if (!payload || payload.email !== 'user@email.it') {
      const err = new Error('Authorization error, no privilege access');
      err.status = 401;
      reject(err);
    }

    User.find({})
      .sort({ email: 'ascending' })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

export const currentCtrl = () =>
  new Promise((resolve, reject) => {
    reject();
  });
