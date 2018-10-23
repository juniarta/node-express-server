import {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl
} from '../controllers/user';

import { serverSettings } from '../../config';

export const registerMid = (req, res, next) => {
  registerCtrl(req.body)
    .then(data => {
      res.status(201).json({
        message: 'New user has been created',
        data
      });
    })
    .catch(err => {
      next(err);
    });
};

export const loginMid = (req, res, next) => {
  loginCtrl(req.body)
    .then(data => {
      req.session.userId = data.user._id;
      res.status(200).json({
        message: 'Welcome to the JWT Auth',
        data
      });
    })
    .catch(err => {
      next(err);
    });
};

export const logoutMid = (req, res, next) => {
  logoutCtrl(req.session)
    .then(() => {
      res
        .clearCookie(serverSettings.cookie.name)
        .status(200)
        .json({
          message: 'Logout done'
        });
    })
    .catch(err => {
      next(err);
    });
};

export const currentMid = (req, res, next) => {
  currentCtrl(req)
    .then(data => {
      res.status(200).json({
        data
      });
    })
    .catch(next);
};
