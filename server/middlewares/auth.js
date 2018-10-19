import { authVerifyCtrl } from '../controllers/auth';

export const authVerifyMid = (req, res, next) => {
  authVerifyCtrl(req.headers)
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(next);
};
