import {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl
} from '../controllers/user';

export const registerMid = (req, res, next) => {
  registerCtrl(req.body)
    .then(data => {
      res.status(200).json({
        message: 'New user has been created',
        data: data
      });
    })
    .catch(err => {
      next(err);
    });
};

export const loginMid = (req, res, next) => {
  loginCtrl(req.body)
    .then(data => {
      res.status(200).json({
        message: 'Welcome to the JWT Auth',
        data: data
      });
    })
    .catch(err => {
      next(err);
    });
};

export const logoutMid = (req, res, next) => {
  logoutCtrl(req.session)
    .then(() => {
      res.status(200).json({
        message: 'Logout done'
      });
    })
    .catch(err => {
      next(err);
    });
};

export const currentMid = (req, res, next) => {
  currentCtrl(req.session)
    .then(data => console.log(data))
    .catch(next);
};
