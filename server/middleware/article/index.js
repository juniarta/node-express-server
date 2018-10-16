import { createCtrl, getAllCtrl, patchCtrl } from '../../controllers/article';

const create = (req, res, next) => {
  createCtrl(req.body)
    .then(data => {
      res.status(200).json({
        message: 'New article has been created',
        data: data
      });
    })
    .catch(err => {
      next(err);
    });
};

const getAll = (req, res, next) => {
  getAllCtrl()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};

const patch = (req, res, next) => {
  patchCtrl(req.params.id, req.body)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};

export const createMid = create;
export const getAllMid = getAll;
export const patchMid = patch;
