import { signupCtrl, signinCtrl } from '../../controllers/user';

const signup = (req, res, next) => {
  signupCtrl(req.body)
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

const signin = (req, res, next) => {
  signinCtrl(req.body)
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

export const signupMid = signup;
export const signinMid = signin;
