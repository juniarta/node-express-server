import { validateTokenCtr, loginCtrl, logoutCtrl } from '../controllers/auth';

import { sessionSettings } from '../../config';

export const authVerifyMid = (req, res, next) => {
  validateTokenCtr(req.headers.authorization)
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(next);
};

export const loginMid = (req, res, next) => {
  loginCtrl(req.body)
    .then(data => {
      req.session.userId = data.user._id;
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};
export const logoutMid = (req, res, next) => {
  logoutCtrl(req.session)
    .then(() => {
      res
        .clearCookie(sessionSettings.name)
        .status(200)
        .json({
          message: 'Logout done'
        });
    })
    .catch(err => {
      next(err);
    });
};
