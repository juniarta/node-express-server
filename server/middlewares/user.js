import { registerCtrl, currentCtrl, allCtrl } from '../controllers/user';

export const registerMid = (req, res, next) => {
  registerCtrl(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    });
};

export const allMid = (req, res, next) => {
  allCtrl(req.decoded)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
};

export const currentMid = (req, res, next) => {
  currentCtrl(req)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
};
